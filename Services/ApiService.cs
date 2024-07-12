using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Garage.Models;

namespace Garage.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<T> GetAsync<T>(string uri)
        {
            var response = await _httpClient.GetAsync(uri);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(content);
            }
            throw new Exception("Failed to fetch data");
        }

        public async Task<Statistics> GetStatisticsAsync()
        {
            return await GetAsync<Statistics>("http://your-pihole-api/statistics");
        }
    }
}
