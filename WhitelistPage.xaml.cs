using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Threading.Tasks;
using Garage.Services;

namespace Garage
{
    public partial class WhitelistPage : UserControl
    {
        private readonly ApiService _apiService;
        private string _baseUrl = "https://blockdns.garageit.pl";

        public WhitelistPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
        }

        private async void WhitelistPage_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadRecentQueries();
        }

        private async Task LoadRecentQueries()
        {
            try
            {
                var response = await _apiService.GetAsync<ApiResponse<List<List<string>>>>($"{_baseUrl}/pi-hole/queries");
                var queryData = response.Data;
                var queries = queryData.Select(data => new Query(data.ToArray())).ToList();
                RecentQueriesDataGrid.ItemsSource = queries;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load recent queries: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void RemoveQuery_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var query = (Query)((Button)sender).DataContext;
                await _apiService.RemoveQueryAsync(_baseUrl, query.Time);
                await LoadRecentQueries();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to remove query: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }

    public class Query
    {
        public string Time { get; set; }
        public string Type { get; set; }
        public string Domain { get; set; }
        public string Client { get; set; }
        public string Status { get; set; }
        public string Reply { get; set; }
        public string Action { get; set; }

        public Query(string[] data)
        {
            Time = data[0];
            Type = data[1];
            Domain = data[2];
            Client = data[3];
            Status = data[4];
            Reply = data[5];
            Action = data.Length > 6 ? data[6] : string.Empty; // Ensure the Action field is handled properly
        }
    }
}
