using Opc.Ua.Client;
using OpcUa.Session;
using OpcUa.Mapping;

class Program
{
    static void Main()
    {
        // Inicia o servidor WebSocket (para clientes web)
        // var wsServer = new WebSocketServer(Config.WEBSOCKET_PREFIX);
        // await wsServer.StartAsync();
        // Console.WriteLine($"WebSocket server iniciado em {Config.WEBSOCKET_PREFIX}");

        // Cria e inicia o cliente OPC UA
        // var opcuaClient = new OpcUaClient(
        //     Config.OPCUA_ENDPOINT,
        //     Config.NODE_IDS_TO_MONITOR,
        //     wsServer.OnSubscriptionEvent
        // );

        // Console.WriteLine("📡 Monitorando alterações dos NodeIds. Pressione ENTER para encerrar.");
        // Console.ReadLine();

        // Cleanup
        // await opcuaClient.StopAsync();
        // await wsServer.StopAsync();
        // wsServer.Dispose();

        // Console.WriteLine("Sessão encerrada.");

        OpcUaSession session = new OpcUaSession(OpcConfig.OPCUA_ENDPOINT);
        Console.WriteLine("Session created.");
        Console.WriteLine($"Session Name: {session.GetSession().SessionName}");
        

    }
}

