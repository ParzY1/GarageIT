using System;
using System.Windows;
using System.Windows.Controls;
using Garage.Services;

namespace Garage
{
    public partial class MainWindow : Window
    {
        private readonly ApiService _apiService;

        // UI element references
        public TextBlock TextBlockTotalQueries { get; set; }
        public TextBlock TextBlockBlockedQueries { get; set; }
        public TextBlock TextBlockPercentageBlocked { get; set; }
        public TextBlock TextBlockDomainsOnAdlists { get; set; }

        public MainWindow()
        {
            InitializeComponent();
            _apiService = new ApiService();

            // Initialize UI elements
            TextBlockTotalQueries = new TextBlock();
            TextBlockBlockedQueries = new TextBlock();
            TextBlockPercentageBlocked = new TextBlock();
            TextBlockDomainsOnAdlists = new TextBlock();

            ShowStatisticsPage();
        }

        private void Dashboard_Click(object sender, RoutedEventArgs e)
        {
            ShowStatisticsPage();
        }

        private void QueryLog_Click(object sender, RoutedEventArgs e)
        {
            ShowWhitelistPage();
        }

        private void Groups_Click(object sender, RoutedEventArgs e)
        {
            ShowBlacklistPage();
        }

        private void ManageClients_Click(object sender, RoutedEventArgs e)
        {
            ShowManageClientsPage();
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
            MainContent.Content = new StatisticsPage();
        }

        private void ShowWhitelistPage()
        {
            MainContent.Content = new WhitelistPage();
        }

        private void ShowBlacklistPage()
        {
            MainContent.Content = new BlacklistPage();
        }

        private void ShowManageClientsPage()
        {
            MainContent.Content = new ManageClientsPage();
        }

        private void ShowSettingsPage()
        {
            MainContent.Content = new SettingsPage();
        }

        private void ShowManageAccountPage()
        {
            MainContent.Content = new ManageAccountPage();
        }

        private void ShowDomainsPage()
        {
            MainContent.Content = new DomainsPage();
        }

        private async void BtnLoadStatistics_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var statistics = await _apiService.GetStatisticsAsync();
                TextBlockTotalQueries.Text = statistics.TotalQueries.ToString();
                TextBlockBlockedQueries.Text = statistics.BlockedQueries.ToString();
                TextBlockPercentageBlocked.Text = $"{statistics.PercentageBlocked}%";
                TextBlockDomainsOnAdlists.Text = statistics.DomainsOnAdlists.ToString();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error loading statistics: " + ex.Message);
            }
        }

        private void BtnManageClients_Click(object sender, RoutedEventArgs e)
        {
            // Implement client management logic
        }

        private void BtnBlockDomain_Click(object sender, RoutedEventArgs e)
        {
            // Implement domain blocking logic
        }

        private void MainContent_Navigated(object sender, System.Windows.Navigation.NavigationEventArgs e)
        {
            // Navigation logic if needed
        }
    }
}
