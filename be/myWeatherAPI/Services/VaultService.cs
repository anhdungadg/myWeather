using Microsoft.Extensions.Localization;
using VaultSharp;
using VaultSharp.V1.AuthMethods.Token;

namespace myWeatherAPI.Services
{
    public class VaultService
    {
        private readonly IVaultClient _vaultClient;

        public VaultService(string vaultAddress, string vaultToken)
        {
            var vaultClientSetting = new VaultClientSettings(vaultAddress, new TokenAuthMethodInfo(vaultToken));
            _vaultClient = new VaultClient(vaultClientSetting);
        }

        public async Task<string> GetSecretAsync(string secretPath)
        {
            var secret = await _vaultClient.V1.Secrets.KeyValue.V2.ReadSecretAsync(secretPath);
            return secret.Data.ToString();
        }
    }
}
