using Garage.Services;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;

namespace Garage
{
    public partial class ManageAccountPage : UserControl
    {
        private readonly ApiService _apiService;

        public ManageAccountPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
            LoadClients();
        }

        private async void LoadClients()
        {
            try
            {
                List<Client> clients = await _apiService.GetClientsAsync("https://blockdns.garageit.pl");
                configuredClientsDataGrid.ItemsSource = clients;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load clients: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void AddClient_Click(object sender, RoutedEventArgs e)
        {
            string clientIp = ((TextBox)this.FindName("ClientNameTextBox")).Text;
            string comment = ((TextBox)this.FindName("CommentTextBox")).Text;

            try
            {
                string response = await _apiService.AddClient("https://blockdns.garageit.pl", clientIp, comment);
                MessageBox.Show("Client added successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                LoadClients(); // Refresh the data grid after adding a client
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to add client: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void RemoveClient_Click(object sender, RoutedEventArgs e)
        {
            if (configuredClientsDataGrid.SelectedItem is Client selectedClient)
            {
                try
                {
                    string response = await _apiService.RemoveClient("https://blockdns.garageit.pl", selectedClient.Ip);
                    MessageBox.Show("Client removed successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    LoadClients(); // Refresh the data grid after removing a client
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to remove client: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            else
            {
                MessageBox.Show("Please select a client to remove", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Logika obsługi zmiany tekstu
        }

        private void configuredClientsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Logika obsługi zmiany zaznaczenia w DataGrid
        }
    }
}
