using System.Collections.Concurrent;
using System.Net;
using System.Net.WebSockets;
using System.Text;

namespace Bridge.Services
{
    // Simple WebSocket server using HttpListener + System.Net.WebSockets.WebSocket
    // Not production-grade but sufficient as a bridge for a React front-end.
    public class WebSocketServer : IDisposable
    {
        private readonly HttpListener _listener;
        private readonly ConcurrentDictionary<Guid, WebSocket> _sockets = new();
        private CancellationTokenSource? _cts;

        public Uri ListenUri { get; }

        public WebSocketServer(string prefix)
        {
            ListenUri = new Uri(prefix);
            _listener = new HttpListener();
            _listener.Prefixes.Add(prefix);
        }

        public async Task StartAsync()
        {
            _cts = new CancellationTokenSource();
            _listener.Start();
            _ = AcceptLoopAsync(_cts.Token);
            await Task.CompletedTask;
        }

        public async Task StopAsync()
        {
            _cts?.Cancel();
            _listener.Stop();

            foreach (var kv in _sockets)
            {
                try
                {
                    await kv.Value.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server stopping", CancellationToken.None);
                }
                catch { }
            }

            _sockets.Clear();
        }

        private async Task AcceptLoopAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                HttpListenerContext ctx;
                try
                {
                    ctx = await _listener.GetContextAsync();
                }
                catch (HttpListenerException)
                {
                    break; // listener stopped
                }

                if (!ctx.Request.IsWebSocketRequest)
                {
                    ctx.Response.StatusCode = 400;
                    ctx.Response.Close();
                    continue;
                }

                _ = HandleWebSocketClientAsync(ctx, ct);
            }
        }

        private async Task HandleWebSocketClientAsync(HttpListenerContext ctx, CancellationToken ct)
        {
            WebSocketContext wsContext = null!;
            try
            {
                wsContext = await ctx.AcceptWebSocketAsync(null);
            }
            catch
            {
                ctx.Response.StatusCode = 500;
                ctx.Response.Close();
                return;
            }

            var socket = wsContext.WebSocket;
            var id = Guid.NewGuid();
            _sockets[id] = socket;

            var buffer = new byte[1024];

            try
            {
                while (socket.State == WebSocketState.Open && !ct.IsCancellationRequested)
                {
                    var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), ct);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        break;
                    }

                    // Echo or ignore payloads from clients in this simple server
                }
            }
            catch { }
            finally
            {
                _sockets.TryRemove(id, out _);
                try { socket.Dispose(); } catch { }
            }
        }

        public async Task BroadcastAsync(string message)
        {
            var bytes = Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(bytes);

            foreach (var kv in _sockets)
            {
                var socket = kv.Value;
                if (socket.State != WebSocketState.Open) continue;
                try
                {
                    await socket.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
                catch
                {
                    // ignore send errors for now
                }
            }
        }

        public void Dispose()
        {
            try { _listener.Stop(); } catch { }
            _cts?.Cancel();
        }

        public void OnSubscriptionEvent(string message)
        {
            _ = BroadcastAsync(message);
        }
    }
}
