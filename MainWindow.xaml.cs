using Garage.Services;
using System;
using System.Windows;

namespace Garage
{
    public partial class MainWindow : Window
    {
        private readonly ApiService _apiService;

        public MainWindow()
        {
            InitializeComponent();
            _apiService = new ApiService();
            ShowStatisticsPage(); // Poka¿ stronê statystyk jako stronê domyœln¹ po uruchomieniu MainWindow
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

        private void ShowManageAccountPage()
        {
            MainContent.Content = new ManageAccountPage();
        }

        private void ShowSettingsPage()
        {
            MainContent.Content = new SettingsPage();
        }

        private void ShowDomainsPage()
        {
            MainContent.Content = new DomainsPage();
        }

        private void MainContent_Navigated(object sender, System.Windows.Navigation.NavigationEventArgs e)
        {
            // Logika nawigacji, jeœli potrzebna
        }
    }
}
