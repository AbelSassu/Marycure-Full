using Microsoft.IdentityModel.Tokens;

public interface IJwksService
{
    Task<SecurityKey[]> GetSigningKeysAsync();
}
