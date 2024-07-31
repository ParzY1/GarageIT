using Garage.Models;
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
                foreach (var client in clients)
                {
                    client.Status = client.Enabled == 1 ? "Włączony" : "Wyłączony"; // Assuming client.Enabled is of type int
                }
                configuredClientsDataGrid.ItemsSource = clients;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load clients: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void AddClient_Click(object sender, RoutedEventArgs e)
        {
            string clientIp = ClientNameTextBox.Text;
            string comment = CommentTextBox.Text;

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

        private async void EditClientComment_Click(object sender, RoutedEventArgs e)
        {
            var client = (Client)((Button)sender).DataContext;
            var newComment = Microsoft.VisualBasic.Interaction.InputBox("Enter new comment:", "Edit Client Comment", client.Comment);

            if (!string.IsNullOrEmpty(newComment) && newComment != client.Comment)
            {
                try
                {
                    await _apiService.EditClientCommentAsync("https://blockdns.garageit.pl", client.Ip, newComment);
                    LoadClients();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to edit client comment: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private async void AddClientToGroup_Click(object sender, RoutedEventArgs e)
        {
            if (configuredClientsDataGrid.SelectedItem is Client selectedClient)
            {
                var group = clientGroupTextBox.Text;
                var baseUrl = "https://blockdns.garageit.pl";

                try
                {
                    await _apiService.AddClientToGroup(baseUrl, selectedClient.Ip, group);
                    MessageBox.Show("Client added to group successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    LoadClients(); // Refresh the data grid after updating the group
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error adding client to group: {ex.Message}");
                }
            }
            else
            {
                MessageBox.Show("Please select a client to add to a group", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void RemoveClientFromGroup_Click(object sender, RoutedEventArgs e)
        {
            if (configuredClientsDataGrid.SelectedItem is Client selectedClient)
            {
                var group = clientGroupTextBox.Text;
                var baseUrl = "https://blockdns.garageit.pl";

                try
                {
                    await _apiService.RemoveClientFromGroup(baseUrl, selectedClient.Ip, group);
                    MessageBox.Show("Client removed from group successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    LoadClients(); // Refresh the data grid after updating the group
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error removing client from group: {ex.Message}");
                }
            }
            else
            {
                MessageBox.Show("Please select a client to remove from a group", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void configuredClientsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Logic to handle selection change in DataGrid
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Logic to handle text change in TextBox
        }
    }
}
