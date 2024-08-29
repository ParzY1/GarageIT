using System;
using System.Windows;
using Newtonsoft.Json;
using Garage.Services;

namespace Garage
{
    public partial class MainWindow : Window
    {
        private ApiService _apiService;
        private StatisticsPage _statisticsPage;
        private string _initialBaseUrl = "https://blockdns.garageit.pl";

        public MainWindow()
        {
            InitializeComponent();
            _apiService = new ApiService(_initialBaseUrl);
        }

        private async void LoginUser(string username, string password)
        {
            try
            {
                string loginResponse = await _apiService.LoginUser(username, password);
                var loginData = JsonConvert.DeserializeObject<dynamic>(loginResponse);

                // Retrieve token and assignedServer from response
                string token = loginData.token;
                string assignedServer = loginData.assignedServer;

                // Set bearer token and update base URL
                _apiService.SetBearerToken(token);
                _apiService.SetBaseUrl(assignedServer);

                ShowStatisticsPage(); // Show statistics page after login
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Login failed: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void Dashboard_Click(object sender, RoutedEventArgs e)
        {
            ShowStatisticsPage();
            if (_statisticsPage != null)
            {
                await _statisticsPage.LoadStatistics();
            }
        }

        private void QueryLog_Click(object sender, RoutedEventArgs e)
        {
            ShowWhitelistPage();
        }

        private void Groups_Click(object sender, RoutedEventArgs e)
        {
            ShowBlacklistPage();
        }

        private void Clients_Click(object sender, RoutedEventArgs e)
        {
            ShowManageAccountPage();
        }

        private void Domains_Click(object sender, RoutedEventArgs e)
        {
            ShowDomainsPage();
        }

        private void Settings_Click(object sender, RoutedEventArgs e)
        {
            ShowSettingsPage();
        }

        private void ShowStatisticsPage()
        {
            _statisticsPage = new StatisticsPage(_apiService);
            MainContent.Content = _statisticsPage;
        }

        private void ShowBlacklistPage()
        {
            MainContent.Content = new BlacklistPage(_apiService);
        }

        private void ShowWhitelistPage()
        {
            MainContent.Content = new WhitelistPage(_apiService);
        }

        private void ShowManageAccountPage()
        {
            MainContent.Content = new ManageAccountPage(_apiService);
        }

        private void ShowDomainsPage()
        {
            MainContent.Content = new DomainsPage(_apiService);
        }

        private void ShowSettingsPage()
        {
            MainContent.Content = new SettingsPage(_apiService);
        }

        private void MainContent_Navigated(object sender, System.Windows.Navigation.NavigationEventArgs e)
        {
            // Navigation logic if needed
        }
    }
}
