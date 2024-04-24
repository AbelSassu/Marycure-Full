using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;


public class JwksService : IJwksService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IConfigurationManager<OpenIdConnectConfiguration> _configurationManager;

    public JwksService(IMemoryCache memoryCache, string jwksUrl)
    {
        _memoryCache = memoryCache;
        _configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            jwksUrl,
            new OpenIdConnectConfigurationRetriever()
        );
    }

    public async Task<SecurityKey[]> GetSigningKeysAsync()
    {
        const string cacheKey = "jwks-signing-keys";
        if (!_memoryCache.TryGetValue(cacheKey, out SecurityKey[] signingKeys))
        {
            var openIdConfig = await _configurationManager.GetConfigurationAsync(CancellationToken.None);
            signingKeys = openIdConfig?.SigningKeys?.ToArray() ?? Array.Empty<SecurityKey>();
            _memoryCache.Set(cacheKey, signingKeys, TimeSpan.FromHours(24)); // Adjust the cache duration as necessary
        }

        return signingKeys ?? Array.Empty<SecurityKey>(); // Assicurati che signingKeys non sia mai null
    }

}
