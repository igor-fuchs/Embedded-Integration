namespace OpcUa.Session;

using Opc.Ua;
using Opc.Ua.Client;

interface IOpcUaSession
{
    Session GetSession();
}

/// <summary>
/// Creates a OPC UA session.
/// </summary>
public class OpcUaSession
{
    #region Constructor 

    /// <summary>
    /// OPC UA session active.
    /// </summary>
    private Session session { get; set; }

    /// <summary>
    /// Constructor that creates the OPC UA session and the subscription for the provided NodeIds.
    /// </summary>
    /// <param name="serverUrl">URL of the OPC UA server.</param>
    /// <param name="listNodeIds">List of NodeIds for the subscription.</param>
    /// <param name="OnSubscriptionEvent">Callback for subscription events.</param>
    public OpcUaSession(Uri serverUrl)
    {
        session = createAsyncSession(serverUrl).GetAwaiter().GetResult();
    }

    #endregion

    #region Public Methods

    /// <summary>
    /// Gets the current OPC UA session.
    /// </summary>
    /// <returns>The current OPC UA session.</returns>
    public Session GetSession()
    {
        return session;
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Creates an asynchronous OPC UA session.
    /// </summary>
    /// <param name="serverUri">URI of the OPC UA server.</param>
    /// <returns>A task that represents the asynchronous operation, containing the created session.</returns>
    private async Task<Session> createAsyncSession(Uri serverUri)
    {

        EndpointDescription selectedEndpoint = new EndpointDescription();

        // Trying to find the OPC UA server endpoint - Selecting the first one found
        using (var discoveryClient = DiscoveryClient.Create(serverUri))
        {
            var servers = await discoveryClient.FindServersAsync(null);
            if (servers.Count > 0)
            {
                // Log discovered servers
                foreach (var server in servers)
                {
                    Console.WriteLine($"Discovered server: {server.ApplicationName}");

                    // Log discovery URLs of the first server
                    foreach (var url in server.DiscoveryUrls)
                    {
                        Console.WriteLine($" - Discovery URL: {url}");
                    }
                }

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

        // Validate selected endpoint
        if (selectedEndpoint == null)
        {
            throw new InvalidOperationException("No OPC UA endpoints found.");
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
        UserIdentity userIdentity = new UserIdentity(new AnonymousIdentityToken()); // Anonymous user

        session = await Session.CreateAsync(
            configuration: config,
            reverseConnectManager: null,
            endpoint: configuredEndpoint,
            updateBeforeConnect: true,
            checkDomain: false,
            sessionName: "EdgeGatewaySession",
            sessionTimeout: 60000,
            userIdentity: userIdentity,
            preferredLocales: null
        );

        return session;
    }
    #endregion
}