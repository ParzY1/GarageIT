using System;
using System.Collections.ObjectModel;
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
            await LoadDomains();
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
                    WhitelistDomains.Add(domain);
                }

                foreach (var domain in blacklist)
                {
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

        private void listComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }
    }
}
