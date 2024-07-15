using System;
using System.Threading.Tasks;
using Garage.Services;
using Newtonsoft.Json;

namespace Garage
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var apiService = new ApiService();
            string baseUrl = "https://blockdns.garageit.pl/";

            // Example usage:
            try
            {
                // Login User
                string loginResponse = await apiService.LoginUser(baseUrl, "tesciu", "tesciu");
                Console.WriteLine("Login Response: " + loginResponse);

                // Assuming loginResponse contains a token. This is just an example.
                var loginData = JsonConvert.DeserializeObject<dynamic>(loginResponse);
                string token = loginData.token;

                // Set the bearer token for subsequent requests
                apiService.SetBearerToken(token);

                // Get Profile
                string profileResponse = await apiService.GetProfile(baseUrl);
                Console.WriteLine("Profile Response: " + profileResponse);

                // Get Statistics
                string statisticsResponse = await apiService.GetStatisticsAsync(baseUrl);
                Console.WriteLine("Statistics: " + statisticsResponse);

                // Add domain to blacklist
                string blacklistResponse = await apiService.AddToBlacklist(baseUrl, "example.com");
                Console.WriteLine("Blacklist Response: " + blacklistResponse);

                // Add domain to whitelist
                string whitelistResponse = await apiService.AddToWhitelist(baseUrl, "example.com");
                Console.WriteLine("Whitelist Response: " + whitelistResponse);

                // Remove domain from blacklist
                string removeBlacklistResponse = await apiService.RemoveFromBlacklist(baseUrl, "example.com");
                Console.WriteLine("Remove Blacklist Response: " + removeBlacklistResponse);

                // Remove domain from whitelist
                string removeWhitelistResponse = await apiService.RemoveFromWhitelist(baseUrl, "example.com");
                Console.WriteLine("Remove Whitelist Response: " + removeWhitelistResponse);

                // Enable domain
                string enableDomainResponse = await apiService.EnableDomain(baseUrl, "example.com");
                Console.WriteLine("Enable Domain Response: " + enableDomainResponse);

                // Disable domain
                string disableDomainResponse = await apiService.DisableDomain(baseUrl, "example.com");
                Console.WriteLine("Disable Domain Response: " + disableDomainResponse);

                // Enable PiHole
                string enablePiHoleResponse = await apiService.EnablePiHole(baseUrl);
                Console.WriteLine("Enable PiHole Response: " + enablePiHoleResponse);

                // Disable PiHole
                string disablePiHoleResponse = await apiService.DisablePiHole(baseUrl, 60);
                Console.WriteLine("Disable PiHole Response: " + disablePiHoleResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}
