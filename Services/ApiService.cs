using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Garage.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private string _bearerToken;

        public ApiService()
        {
            _httpClient = new HttpClient();
        }

        public void SetBearerToken(string token)
        {
            _bearerToken = token;
        }

        private void AddAuthorizationHeader()
        {
            if (!string.IsNullOrEmpty(_bearerToken))
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _bearerToken);
            }
        }

        private async Task<string> PostAsync<T>(string uri, T data)
        {
            AddAuthorizationHeader();
            var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(uri, content);
            var responseString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode} and message: {responseString}");
            }

            return responseString;
        }

        public async Task<T> GetAsync<T>(string uri)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync(uri);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(content);
            }
            throw new Exception("Failed to fetch data");
        }

        public async Task<string> RegisterUser(string baseUrl, string username, string password)
        {
            var userData = new { username, password };
            return await PostAsync($"{baseUrl}/users/register", userData);
        }

        public async Task<string> LoginUser(string baseUrl, string username, string password)
        {
            var userData = new { username, password };
            return await PostAsync($"{baseUrl}/users/login", userData);
        }

        public async Task<string> GetProfile(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/users/profile");
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetStatisticsAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/statistics");
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> AddToBlacklist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/blacklist", domainData);
        }

        public async Task<string> AddToWhitelist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/whitelist", domainData);
        }

        public async Task<string> RemoveFromBlacklist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/blacklist/remove", domainData);
        }

        public async Task<string> RemoveFromWhitelist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/whitelist/remove", domainData);
        }

        public async Task<string> EnableDomain(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domain/enable", domainData);
        }

        public async Task<string> DisableDomain(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domain/disable", domainData);
        }

        public async Task<string> EnablePiHole(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/pihole/enable");
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> DisablePiHole(string baseUrl, int duration = 0)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/pihole/disable?duration={duration}");
            return await response.Content.ReadAsStringAsync();
        }
    }
}
