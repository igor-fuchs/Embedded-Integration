using Opc.Ua;
using Opc.Ua.Client;

namespace Bridge.Services
{
    public class OpcUaClient
    {
        private readonly string endpointUrl;
        private readonly string nodeId;
        private Session session;

        public OpcUaClient(string endpointUrl, string nodeId)
        {
            this.endpointUrl = endpointUrl;
            this.nodeId = nodeId;
        }

        public async Task ConnectAsync()
        {
            var config = new ApplicationConfiguration()
            {
                ApplicationName = "OpcUaClient",
                ApplicationType = ApplicationType.Client,
                SecurityConfiguration = new SecurityConfiguration
                {
                    AutoAcceptUntrustedCertificates = true
                }
            };

            await config.Validate(ApplicationType.Client);
            var endpoint = CoreClientUtils.SelectEndpoint(endpointUrl, false);
            session = await Session.Create(config, new ConfiguredEndpoint(null, endpoint), false, "OpcUaClient", 60000, null, null);
        }

        public async Task MonitorNodeAsync(Action<object> onValueChanged)
        {
            var subscription = new Subscription(session.DefaultSubscription) { PublishingInterval = 1000 };
            var monitoredItem = new MonitoredItem(subscription.DefaultItem)
            {
                StartNodeId = nodeId,
                AttributeId = Attributes.Value
            };

            monitoredItem.Notification += (s, e) =>
            {
                var value = e.NotificationValue as MonitoredItemNotification;
                onValueChanged(value?.Value);
            };

            subscription.AddItem(monitoredItem);
            subscription.Create();
        }

        public async Task WriteValueAsync(object value)
        {
            if (session == null) throw new InvalidOperationException("Session is not established.");

            var nodeToWrite = new WriteValue
            {
                NodeId = new NodeId(nodeId),
                AttributeId = Attributes.Value,
                Value = new DataValue
                {
                    Value = value,
                    StatusCode = StatusCodes.Good,
                    SourceTimestamp = DateTime.UtcNow
                }
            };

            var writeValues = new WriteValueCollection { nodeToWrite };
            var results = await session.WriteAsync(null, writeValues, CancellationToken.None);
        }
    }
}