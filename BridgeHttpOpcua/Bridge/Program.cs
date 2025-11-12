using System.Text.Json;
using OpcUaClientMonitor.Services;
using Opc.Ua;
using Opc.Ua.Client;

namespace OpcUaClientMonitor
{
    class Program
    {
        private static WebSocketServer? _wsServer;

        static async Task Main()
        {
            const string serverUrl = "opc.tcp://192.168.1.20:4840";
            var serverUri = new Uri(serverUrl);

            EndpointDescription? selectedEndpoint = null;

            // Discover servers and endpoints
            using (var discoveryClient = DiscoveryClient.Create(serverUri))
            {
                var servers = await discoveryClient.FindServersAsync(null);

                Console.WriteLine("Servidores OPC UA disponíveis:");
                foreach (var server in servers)
                {
                    Console.WriteLine($"- {server.ApplicationName} ({server.ApplicationUri})");
                    foreach (var url in server.DiscoveryUrls)
                    {
                        Console.WriteLine($"  - {url}");
                    }
                }

                if (servers.Count > 0)
                {
                    var firstServer = servers[0];
                    var discoveryUrl = firstServer.DiscoveryUrls.Count > 0
                        ? new Uri(firstServer.DiscoveryUrls[0])
                        : serverUri;

                    using (var endpointDiscovery = DiscoveryClient.Create(discoveryUrl))
                    {
                        var endpoints = await endpointDiscovery.GetEndpointsAsync(null);
                        Console.WriteLine("Endpoints disponíveis:");
                        foreach (var ep in endpoints)
                        {
                            Console.WriteLine($"- {ep.EndpointUrl} (SecurityMode: {ep.SecurityMode}, SecurityPolicy: {ep.SecurityPolicyUri})");
                        }

                        if (endpoints.Count > 0)
                        {
                            selectedEndpoint = endpoints[0];
                        }
                    }
                }
            }

            if (selectedEndpoint == null)
            {
                Console.WriteLine("Nenhum endpoint encontrado. Encerrando.");
                return;
            }

            ApplicationConfiguration config = new ApplicationConfiguration
            {
                ApplicationName = "UA Client 1500",
                ApplicationType = ApplicationType.Client,
                ApplicationUri = "urn:MyClient",
                ProductUri = "Fuchs",
                ClientConfiguration = new ClientConfiguration { DefaultSessionTimeout = 360000 }
            };

            Console.WriteLine($"Conectando ao servidor OPC UA em {serverUrl}...");
            EndpointConfiguration endpointConfiguration = EndpointConfiguration.Create(config);
            ConfiguredEndpoint configuredEndpoint = new ConfiguredEndpoint(null, selectedEndpoint, endpointConfiguration);
            UserIdentity userIdentity = new UserIdentity(new AnonymousIdentityToken());

            Session session = await Session.CreateAsync(
                configuration: config,
                reverseConnectManager: null,
                endpoint: configuredEndpoint,
                updateBeforeConnect: true,
                checkDomain: false,
                sessionName: "MySession",
                sessionTimeout: 60000,
                userIdentity: userIdentity,
                preferredLocales: null
            );

            Console.WriteLine("✅ Conectado ao servidor OPC UA com sucesso!");

            // Inicia o servidor WebSocket (para clientes web)
            _wsServer = new WebSocketServer("http://localhost:5000/ws/");
            await _wsServer.StartAsync();
            Console.WriteLine("WebSocket server iniciado em http://localhost:5000/ws/");

            // Exemplo de NodeIds para monitorar (ajuste conforme necessário)
            List<string> nodeIdsToMonitor = new()
            {
                "ns=3;s=\"ST005_BUFFER_FB_IDB\".\"EMITTER_FB\".\"NextIsGreen\"",
                "ns=3;s=\"ST005_BUFFER_FB_IDB\".\"EMITTER_FB\".\"NextIsBlue\"",
                "ns=3;s=\"ST005_BUFFER_FB_IDB\".\"EMITTER_FB\".\"NextIsMetal\""
            };

            // Cria uma subscription para monitoramento
            Subscription subscription = new Subscription(session.DefaultSubscription) { PublishingInterval = 1000 };

            foreach (var nodeIdStr in nodeIdsToMonitor)
            {
                var monitoredItem = new MonitoredItem(subscription.DefaultItem)
                {
                    DisplayName = nodeIdStr,
                    StartNodeId = new NodeId(nodeIdStr)
                };

                monitoredItem.Notification += OnMonitoredItemNotification;
                subscription.AddItem(monitoredItem);
            }

            session.AddSubscription(subscription);
            await subscription.CreateAsync();

            Console.WriteLine("📡 Monitorando alterações dos NodeIds. Pressione ENTER para encerrar.");
            Console.ReadLine();

            // Cleanup
            await subscription.DeleteAsync(true);
            await session.CloseAsync();
            session.Dispose();

            if (_wsServer != null)
            {
                await _wsServer.StopAsync();
                _wsServer.Dispose();
            }

            Console.WriteLine("Sessão encerrada.");
        }

        private static void OnMonitoredItemNotification(MonitoredItem item, MonitoredItemNotificationEventArgs e)
        {
            foreach (var value in item.DequeueValues())
            {
                var payload = new
                {
                    node = item.DisplayName,
                    timestamp = DateTime.UtcNow,
                    value = value.Value
                };

                var json = JsonSerializer.Serialize(payload);

                // Envia para todos os clientes conectados (fire-and-forget)
                _ = _wsServer?.BroadcastAsync(json);

                Console.WriteLine($"{DateTime.Now:HH:mm:ss} | {item.DisplayName} => {value.Value}");
            }
        }
    }
}
