using System.Text.Json;
using Opc.Ua;
using Opc.Ua.Client;

namespace Bridge.Services
{
    /// <summary>
    /// Encapsula a lógica de conexão OPC UA, criação de subscription e broadcast via WebSocketServer.
    /// </summary>
    public class OpcUaClient : IAsyncDisposable
    {
        /// <summary>
        /// Sessão OPC UA ativa.
        /// </summary>
        private Session session;
        /// <summary>
        /// Subscription OPC UA ativa.
        /// </summary>
        private Subscription subscription;

        /// <summary>
        /// Construtor que cria a sessão OPC UA e a subscription para os NodeIds fornecidos.
        /// </summary>
        /// <param name="serverUrl">URL do servidor OPC UA.</param>
        /// <param name="listNodeIds">Lista de NodeIds para a subscription.</param>
        /// <param name="OnSubscriptionEvent">Callback para eventos da subscription.</param>
        public OpcUaClient(Uri serverUrl, List<string> listNodeIds, Action<string> OnSubscriptionEvent)
        {
            session = createAsyncSession(serverUrl).GetAwaiter().GetResult();
            subscription = createAsyncSubscription(listNodeIds, OnSubscriptionEvent).GetAwaiter().GetResult();
        }

        /// <summary>
        /// Encerra a sessão OPC UA.
        /// </summary>
        /// <returns></returns>
        public async Task StopAsync()
        {
            await subscription.DeleteAsync(true);
            await session.CloseAsync();
        }

        /// <summary>
        /// Limpa recursos da sessão OPC UA.
        /// </summary>
        public async ValueTask DisposeAsync()
        {
            session.Dispose();
        }

        #region Private Methods

        /// <summary>
        /// Cria uma sessão OPC UA assíncrona.
        /// </summary>
        /// <param name="serverUri">URI do servidor OPC UA.</param>
        /// <returns>Uma tarefa que representa a operação assíncrona, contendo a sessão criada.</returns>
        private async Task<Session> createAsyncSession(Uri serverUri)
        {
            EndpointDescription selectedEndpoint = new EndpointDescription();
            using (var discoveryClient = DiscoveryClient.Create(serverUri))
            {
                var servers = await discoveryClient.FindServersAsync(null);
                if (servers.Count > 0)
                {
                    var firstServer = servers[0];
                    var firstDiscoveryUrl = new Uri(firstServer.DiscoveryUrls[0]);

                    using (var endpointDiscovery = DiscoveryClient.Create(firstDiscoveryUrl))
                    {
                        var endpoints = await endpointDiscovery.GetEndpointsAsync(null);
                        if (endpoints.Count > 0)
                        {
                            selectedEndpoint = endpoints[0];
                        }
                    }
                }
            }

            if (selectedEndpoint == null)
            {
                throw new InvalidOperationException("Nenhum endpoint OPC UA encontrado.");
            }

            var config = new ApplicationConfiguration
            {
                ApplicationName = "UA Client 1500",
                ApplicationType = ApplicationType.Client,
                ApplicationUri = "urn:MyClient",
                ProductUri = "Fuchs",
                ClientConfiguration = new ClientConfiguration { DefaultSessionTimeout = 360000 }
            };

            EndpointConfiguration endpointConfiguration = EndpointConfiguration.Create(config);
            ConfiguredEndpoint configuredEndpoint = new ConfiguredEndpoint(null, selectedEndpoint, endpointConfiguration);
            UserIdentity userIdentity = new UserIdentity(new AnonymousIdentityToken());

            session = await Session.CreateAsync(
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

            return session;
        }

        /// <summary>
        /// Cria uma subscription OPC UA assíncrona para os NodeIds fornecidos.
        /// </summary>
        /// <param name="listNodeIds">Lista de NodeIds para monitorar.</param
        /// <param name="OnSubscriptionEvent">Callback para eventos da subscription.</param>
        /// <returns>Uma tarefa que representa a operação assíncrona, contendo a subscription criada.</returns>
        private async Task<Subscription> createAsyncSubscription(List<string> listNodeIds, Action<string> OnSubscriptionEvent)
        {
            // Create subscription
            subscription = new Subscription(session.DefaultSubscription) { PublishingInterval = 1000 };

            foreach (var nodeId in listNodeIds)
            {
                var display = nodeId;
                var monitoredItem = new MonitoredItem(subscription.DefaultItem)
                {
                    DisplayName = display,
                    StartNodeId = new NodeId(display)
                };

                // Handler para notificações de mudança de valor
                monitoredItem.Notification += (item, e) =>
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

                        // Manda a mensagem para todos os clientes WebSocket conectados (fire-and-forget)
                        OnSubscriptionEvent(json); //_ = wsServer.BroadcastAsync(json);

                        Console.WriteLine($"{DateTime.Now:HH:mm:ss} | {item.DisplayName} => {value.Value}");
                    }
                };

                subscription.AddItem(monitoredItem);
            }

            session.AddSubscription(subscription);
            await subscription.CreateAsync();

            return subscription;
        }

        #endregion Private Methods

    }
}
