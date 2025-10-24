namespace Bridge
{
    public class BridgeProgram
    {
        public static async Task Main(string[] args)
        {
            // Initialize and start the WebSocket server
            var webSocketServer = new Services.WebSocketServer();
            webSocketServer.Start();

            // Initialize and start the OPC UA client
            var opcUaClient = new Services.OpcUaClient();
            await opcUaClient.ConnectAndMonitorAsync();

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();

            // Clean up resources
            webSocketServer.Stop();
            await opcUaClient.DisconnectAsync();
        }
    }
}