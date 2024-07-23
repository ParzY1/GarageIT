using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Garage.Models;
using DirectoryDomain = System.DirectoryServices.ActiveDirectory.Domain; // Aliasowanie innej klasy Domain

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

        public async Task<string> PostAsync<T>(string uri, T data)
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

        public async Task<ApiResponse<List<Group>>> GetGroupsAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/groups/getGroups");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<ApiResponse<List<Group>>>(content);
            }
            throw new Exception("Failed to fetch groups data");
        }

        public async Task AddGroupAsync(string baseUrl, string name, string description)
        {
            var groupData = new { name, description };
            var response = await PostAsync($"{baseUrl}/groups/addGroup", groupData);
            Console.WriteLine("AddGroupAsync response: " + response);
        }

        public async Task DeleteGroupAsync(string baseUrl, string name)
        {
            var groupData = new { name };
            var response = await PostAsync($"{baseUrl}/groups/deleteGroup", groupData);
            Console.WriteLine("DeleteGroupAsync response: " + response);
        }

        public async Task EnableGroupAsync(string baseUrl, string name)
        {
            var groupData = new { name };
            var response = await PostAsync($"{baseUrl}/groups/enableGroup", groupData);
            Console.WriteLine("EnableGroupAsync response: " + response);
        }

        public async Task DisableGroupAsync(string baseUrl, string name)
        {
            var groupData = new { name };
            var response = await PostAsync($"{baseUrl}/groups/disableGroup", groupData);
            Console.WriteLine("DisableGroupAsync response: " + response);
        }

        public async Task EditGroupNameAsync(string baseUrl, string oldName, string newName)
        {
            var groupData = new { oldName, newName };
            var response = await PostAsync($"{baseUrl}/groups/editGroupName", groupData);
            Console.WriteLine("EditGroupNameAsync response: " + response);
        }

        public async Task EditGroupDescriptionAsync(string baseUrl, string name, string description)
        {
            var groupData = new { name, description };
            var response = await PostAsync($"{baseUrl}/groups/editGroupDescription", groupData);
            Console.WriteLine("EditGroupDescriptionAsync response: " + response);
        }

        public async Task<ApiResponse<List<Query>>> GetQueriesAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/pi-hole/queries");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<ApiResponse<List<Query>>>(content);
            }
            throw new Exception("Failed to fetch queries data");
        }

        public async Task<ApiResponse<List<Query>>> GetQueriesLast24HoursAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/pi-hole/queries-last-24-hours");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<ApiResponse<List<Query>>>(content);
            }
            throw new Exception("Failed to fetch queries data");
        }

        public async Task RemoveQueryAsync(string baseUrl, string time)
        {
            var queryData = new { time };
            var response = await PostAsync($"{baseUrl}/pi-hole/removeQuery", queryData);
            Console.WriteLine("RemoveQueryAsync response: " + response);
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
            var response = await _httpClient.GetAsync($"{baseUrl}/pi-hole/summary-statistics");
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> AddToBlacklist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domains/addToBlacklist", domainData);
        }

        public async Task<string> AddToWhitelist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domains/addToWhitelist", domainData);
        }

        public async Task<string> AddToBlacklist(string baseUrl, string domain, string comment)
        {
            var domainData = new { domain, comment };
            return await PostAsync($"{baseUrl}/domains/addToBlacklist", domainData);
        }

        public async Task<string> AddToWhitelist(string baseUrl, string domain, string comment)
        {
            var domainData = new { domain, comment };
            return await PostAsync($"{baseUrl}/domains/addToWhitelist", domainData);
        }

        public async Task<string> RemoveFromBlacklist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domains/removeFromBlacklist", domainData);
        }

        public async Task<string> RemoveFromWhitelist(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domains/removeFromWhitelist", domainData);
        }

        public async Task<string> EnableDomain(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domains/enableDomain", domainData);
        }

        public async Task<string> DisableDomain(string baseUrl, string domain)
        {
            var domainData = new { domain };
            return await PostAsync($"{baseUrl}/domains/disableDomain", domainData);
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

        public async Task<List<Client>> GetClientsAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/Clients/getClients");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<dynamic>(content);

                if ((bool)result.success)
                {
                    return JsonConvert.DeserializeObject<List<Client>>(Convert.ToString(result.data));
                }
            }
            throw new Exception("Failed to fetch clients data");
        }

        public async Task<string> AddClient(string baseUrl, string clientIp, string comment)
        {
            var clientData = new { ip = clientIp, comment };
            return await PostAsync($"{baseUrl}/Clients/addClient", clientData);
        }

        public async Task<string> RemoveClient(string baseUrl, string clientIp)
        {
            var clientData = new { ip = clientIp };
            return await PostAsync($"{baseUrl}/Clients/removeClient", clientData);
        }

        public async Task EditClientCommentAsync(string baseUrl, string clientIp, string comment)
        {
            var clientData = new { ip = clientIp, comment };
            var response = await PostAsync($"{baseUrl}/Clients/editClientComment", clientData);
            Console.WriteLine("EditClientCommentAsync response: " + response);
        }

        public async Task<List<Garage.Models.Domain>> GetDomainsAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/domains/getDomains");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Garage.Models.Domain>>(content);
            }
            throw new Exception("Failed to fetch domains data");
        }

        public async Task<List<Domain>> GetBlacklistAsync(string baseUrl)
        {
            var response = await GetAsync<ApiResponse<List<Domain>>>($"{baseUrl}/domains/getBlacklist");
            return response.Data;
        }

        public async Task<List<Domain>> GetWhitelistAsync(string baseUrl)
        {
            var response = await GetAsync<ApiResponse<List<Domain>>>($"{baseUrl}/domains/getWhitelist");
            return response.Data;
        }
        public async Task<string> GetServerStatusAsync(string baseUrl)
        {
            AddAuthorizationHeader();
            var response = await _httpClient.GetAsync($"{baseUrl}/server-status");
            return await response.Content.ReadAsStringAsync();
        }

    }

    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T Data { get; set; }
    }
}
