using Garage.Models;
using Garage.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Garage
{
    public partial class BlacklistPage : UserControl
    {
        private readonly ApiService _apiService;
        private string _baseUrl = "https://blockdns.garageit.pl";

        public BlacklistPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
        }

        private async void BlacklistPage_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadGroups();
        }

        private async Task LoadGroups()
        {
            try
            {
                var response = await _apiService.GetGroupsAsync(_baseUrl);
                var groups = response.Data;
                groupsDataGrid.ItemsSource = groups;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load groups: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void AddToBlacklist_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var name = domainTextBox.Text;
                var description = groupDescriptionTextBox.Text;
                await _apiService.AddGroupAsync(_baseUrl, name, description);
                await LoadGroups();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to add group: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void RemoveFromBlacklist_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var group = (Group)((Button)sender).DataContext;
                await _apiService.DeleteGroupAsync(_baseUrl, group.Name);
                await LoadGroups();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to delete group: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void ToggleGroupStatus_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var group = (Group)((FrameworkElement)sender).DataContext;
                if (group.Enabled == 1)
                {
                    await _apiService.DisableGroupAsync(_baseUrl, group.Name);
                }
                else
                {
                    await _apiService.EnableGroupAsync(_baseUrl, group.Name);
                }
                await LoadGroups();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to toggle group status: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void EditGroupName_Click(object sender, RoutedEventArgs e)
        {
            var group = (Group)((Button)sender).DataContext;
            var newName = Microsoft.VisualBasic.Interaction.InputBox("Enter new group name:", "Edit Group Name", group.Name);

            if (!string.IsNullOrEmpty(newName) && newName != group.Name)
            {
                try
                {
                    await _apiService.EditGroupNameAsync(_baseUrl, group.Name, newName);
                    await LoadGroups();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to edit group name: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private async void EditGroupDescription_Click(object sender, RoutedEventArgs e)
        {
            var group = (Group)((Button)sender).DataContext;
            var newDescription = Microsoft.VisualBasic.Interaction.InputBox("Enter new description:", "Edit Group Description", group.Description);

            if (!string.IsNullOrEmpty(newDescription) && newDescription != group.Description)
            {
                try
                {
                    await _apiService.EditGroupDescriptionAsync(_baseUrl, group.Name, newDescription);
                    await LoadGroups();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Failed to edit group description: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private void groupsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
        }

        private void groupsDataGrid_SelectionChanged_1(object sender, SelectionChangedEventArgs e)
        {
        }
    }
}
