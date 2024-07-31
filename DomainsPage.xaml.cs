using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Garage.Services;
using Garage.Models;

namespace Garage
{
    public partial class DomainsPage : UserControl
    {
        private readonly ApiService _apiService;
        public ObservableCollection<Domain> WhitelistDomains { get; set; }
        public ObservableCollection<Domain> BlacklistDomains { get; set; }
        private Dictionary<int, string> _groupNames;

        public DomainsPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
            WhitelistDomains = new ObservableCollection<Domain>();
            BlacklistDomains = new ObservableCollection<Domain>();
            DataContext = this;
        }

        private async void DomainsPage_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadGroups();
            await LoadDomains();
        }

        private async Task LoadGroups()
        {
            var baseUrl = "https://blockdns.garageit.pl";
            try
            {
                var groupsResponse = await _apiService.GetGroupsAsync(baseUrl);
                _groupNames = groupsResponse.Data.ToDictionary(g => g.Id, g => g.Name);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading groups: {ex.Message}");
            }
        }

        private async Task LoadDomains()
        {
            var baseUrl = "https://blockdns.garageit.pl";
            try
            {
                var blacklist = await _apiService.GetBlacklistAsync(baseUrl);
                var whitelist = await _apiService.GetWhitelistAsync(baseUrl);

                WhitelistDomains.Clear();
                BlacklistDomains.Clear();

                foreach (var domain in whitelist)
                {
                    domain.GroupsString = string.Join(", ", domain.Groups.Select(g => _groupNames.ContainsKey(g) ? _groupNames[g] : g.ToString()));
                    WhitelistDomains.Add(domain);
                }

                foreach (var domain in blacklist)
                {
                    domain.GroupsString = string.Join(", ", domain.Groups.Select(g => _groupNames.ContainsKey(g) ? _groupNames[g] : g.ToString()));
                    BlacklistDomains.Add(domain);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading domains: {ex.Message}");
            }
        }

        private async void AddToDomains_Click(object sender, RoutedEventArgs e)
        {
            var domain = domainTextBox.Text;
            var comment = commentTextBox.Text;
            var listType = (listComboBox.SelectedItem as ComboBoxItem)?.Content.ToString();

            var baseUrl = "https://blockdns.garageit.pl";

            try
            {
                if (listType == "Dozwolone")
                {
                    await _apiService.AddToWhitelist(baseUrl, domain, comment);
                }
                else if (listType == "Zablokowane")
                {
                    await _apiService.AddToBlacklist(baseUrl, domain, comment);
                }

                // Clear input fields after adding
                domainTextBox.Text = string.Empty;
                commentTextBox.Text = string.Empty;
                listComboBox.SelectedIndex = -1;

                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error adding domain: {ex.Message}");
            }
        }

        private async void RemoveFromWhitelist_Click(object sender, RoutedEventArgs e)
        {
            var domain = (sender as Button)?.DataContext as Domain;
            var baseUrl = "https://blockdns.garageit.pl";

            try
            {
                await _apiService.RemoveFromWhitelist(baseUrl, domain.DomainName);
                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error removing domain from whitelist: {ex.Message}");
            }
        }

        private async void RemoveFromBlacklist_Click(object sender, RoutedEventArgs e)
        {
            var domain = (sender as Button)?.DataContext as Domain;
            var baseUrl = "https://blockdns.garageit.pl";

            try
            {
                await _apiService.RemoveFromBlacklist(baseUrl, domain.DomainName);
                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error removing domain from blacklist: {ex.Message}");
            }
        }

        private async void AddToWhitelist_Click(object sender, RoutedEventArgs e)
        {
            var domain = (sender as Button)?.DataContext as Domain;
            var baseUrl = "https://blockdns.garageit.pl";

            try
            {
                await _apiService.AddToWhitelist(baseUrl, domain.DomainName);
                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error adding domain to whitelist: {ex.Message}");
            }
        }

        private async void AddToBlacklist_Click(object sender, RoutedEventArgs e)
        {
            var domain = (sender as Button)?.DataContext as Domain;
            var baseUrl = "https://blockdns.garageit.pl";

            try
            {
                await _apiService.AddToBlacklist(baseUrl, domain.DomainName);
                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error adding domain to blacklist: {ex.Message}");
            }
        }

        private async void AddSelectedDomainsToGroup_Click(object sender, RoutedEventArgs e)
        {
            var group = groupTextBox.Text;
            var baseUrl = "https://blockdns.garageit.pl";
            var selectedDomains = WhitelistDomains.Where(d => d.IsSelected).Concat(BlacklistDomains.Where(d => d.IsSelected)).ToList();

            try
            {
                foreach (var domain in selectedDomains)
                {
                    await _apiService.AddDomainToGroup(baseUrl, domain.DomainName, group);
                }
                MessageBox.Show("Selected domains added to group successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error adding domains to group: {ex.Message}");
            }
        }

        private async void RemoveSelectedDomainsFromGroup_Click(object sender, RoutedEventArgs e)
        {
            var group = groupTextBox.Text;
            var baseUrl = "https://blockdns.garageit.pl";
            var selectedDomains = WhitelistDomains.Where(d => d.IsSelected).Concat(BlacklistDomains.Where(d => d.IsSelected)).ToList();

            try
            {
                foreach (var domain in selectedDomains)
                {
                    await _apiService.RemoveDomainFromGroup(baseUrl, domain.DomainName, group);
                }
                MessageBox.Show("Selected domains removed from group successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                await LoadDomains();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error removing domains from group: {ex.Message}");
            }
        }

        private void listComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // Handle selection change if necessary
        }
    }
}
