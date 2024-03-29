using Microsoft.Extensions.Localization;
using System.Linq.Expressions;
using System;
using VaultSharp;
using VaultSharp.V1.AuthMethods.Token;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace myWeatherAPI.Services
{
    public interface IVaultService
    {
        Task<string> GetSecretAsync(string secretPath);
    }

    public class VaultService: IVaultService
    {
        private readonly IVaultClient _vaultClient;

        public VaultService(IVaultClient vaultClient)
        {
            _vaultClient = vaultClient;
        }

        public async Task<string> GetSecretAsync(string secretPath)
        {
            var secret = await _vaultClient.V1.Secrets.KeyValue.V2.ReadSecretAsync(secretPath);
            if (secret?.Data?.Data == null)
            {
                throw new Exception("Secret not found");
            }
            return secret.Data.Data["api_key"].ToString();

        }

    }
}
