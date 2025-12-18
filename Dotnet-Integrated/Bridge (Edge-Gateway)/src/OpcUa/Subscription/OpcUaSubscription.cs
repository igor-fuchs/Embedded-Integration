namespace OpcUa.Subscription;

using System.Text.Json;
using Opc.Ua;
using Opc.Ua.Client;

/// <summary>
/// Encapsula a lógica de conexão OPC UA, criação de subscription e broadcast via WebSocketServer.
/// </summary>
public class OpcUaSubscription
{
    #region Constructor

    private Subscription subscription;

    public OpcUaSubscription(Session session, List<string> listNodeIds, Action<string> OnSubscriptionEvent)
    {
        subscription = createAsyncSubscription(session, listNodeIds, OnSubscriptionEvent).GetAwaiter().GetResult();
    }

    #endregion

    #region Private Methods
    /// <summary>
    /// Cria uma subscription OPC UA assíncrona para os NodeIds fornecidos.
    /// </summary>
    /// <param name="listNodeIds">Lista de NodeIds para monitorar.</param
    /// <param name="OnSubscriptionEvent">Callback para eventos da subscription.</param>
    /// <returns>Uma tarefa que representa a operação assíncrona, contendo a subscription criada.</returns>
    private async Task<Subscription> createAsyncSubscription(Session session, List<string> listNodeIds, Action<string> OnSubscriptionEvent)
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
    #endregion
}