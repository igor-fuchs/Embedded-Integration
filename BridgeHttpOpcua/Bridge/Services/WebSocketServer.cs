using System.Net;
using System.Net.WebSockets;
using System.Text;

namespace Bridge.Services
{
    public class WebSocketServer
    {
        private readonly List<WebSocket> _clients = new List<WebSocket>();
        private readonly HttpListener _httpListener;

        public WebSocketServer(string url)
        {
            _httpListener = new HttpListener();
            _httpListener.Prefixes.Add(url);
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _httpListener.Start();
            Console.WriteLine("WebSocket server started...");

            while (!cancellationToken.IsCancellationRequested)
            {
                var context = await _httpListener.GetContextAsync();
                if (context.Request.IsWebSocketRequest)
                {
                    ProcessWebSocketRequest(context);
                }
            }
        }

        private async void ProcessWebSocketRequest(HttpListenerContext context)
        {
            var webSocketContext = await context.AcceptWebSocketAsync(null);
            var webSocket = webSocketContext.WebSocket;
            _clients.Add(webSocket);
            Console.WriteLine("WebSocket client connected.");

            await ReceiveMessages(webSocket);
        }

        private async Task ReceiveMessages(WebSocket webSocket)
        {
            var buffer = new byte[1024];

            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    Console.WriteLine($"Received: {message}");
                    await BroadcastAsync(message);
                }
            }

            _clients.Remove(webSocket);
            Console.WriteLine("WebSocket client disconnected.");
        }

        private async Task BroadcastAsync(string message)
        {
            var buffer = Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(buffer);

            foreach (var client in _clients)
            {
                if (client.State == WebSocketState.Open)
                {
                    await client.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }
    }
}