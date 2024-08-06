using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Garage.Services;

namespace Garage
{
    public partial class SettingsPage : UserControl
    {
        private readonly ApiService _apiService;

        public SettingsPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
            Loaded += UserControl_Loaded;
        }

        private async void ApplyRateLimit_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var queryCount = RateLimitQueryCountTextBox.Text;
                var seconds = RateLimitSecondsTextBox.Text;
                var response = await _apiService.PostAsync("https://blockdns.garageit.pl/settings/rate-limit", new { value = $"{queryCount}/{seconds}" });
                MessageBox.Show("Rate limit settings applied successfully.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error applying rate limit settings: {ex.Message}");
            }
        }

        private async void ApplyConditionalForwarding_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var localNetwork = LocalNetworkCidrTextBox.Text;
                var dhcpServerIp = DhcpServerIpTextBox.Text;
                var localDomainName = LocalDomainNameTextBox.Text;
                var response = await _apiService.PostAsync("https://blockdns.garageit.pl/settings/conditional-forwarding", new { localNetwork, dhcpServerIp, localDomainName });
                MessageBox.Show("Conditional forwarding settings applied successfully.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error applying conditional forwarding settings: {ex.Message}");
            }
        }

        private async void ApplyPrivacyLevel_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                int privacyLevel = 0;
                if (HideDomainsRadioButton.IsChecked == true) privacyLevel = 1;
                if (HideDomainsAndClientsRadioButton.IsChecked == true) privacyLevel = 2;
                if (AnonymousModeRadioButton.IsChecked == true) privacyLevel = 3;
                var response = await _apiService.PostAsync("https://blockdns.garageit.pl/settings/privacy-level", new { value = privacyLevel });
                MessageBox.Show("Privacy level settings applied successfully.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error applying privacy level settings: {ex.Message}");
            }
        }

        private async void ApplyDnsServers_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var dns1 = Dns1TextBox.Text;
                var dns2 = Dns2TextBox.Text;
                var response = await _apiService.PostAsync("https://blockdns.garageit.pl/settings/dns-servers", new { dns1, dns2 });
                MessageBox.Show("DNS server settings applied successfully.");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error applying DNS server settings: {ex.Message}");
            }
        }

        private async void UserControl_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                var rateLimit = await _apiService.GetAsync<string>("https://blockdns.garageit.pl/settings/rate-limit");
                var rateLimitParts = rateLimit.Split('/');
                RateLimitQueryCountTextBox.Text = rateLimitParts[0];
                RateLimitSecondsTextBox.Text = rateLimitParts[1];

                var privacyLevel = await _apiService.GetAsync<int>("https://blockdns.garageit.pl/settings/privacy-level");
                switch (privacyLevel)
                {
                    case 0:
                        ShowEverythingRadioButton.IsChecked = true;
                        break;
                    case 1:
                        HideDomainsRadioButton.IsChecked = true;
                        break;
                    case 2:
                        HideDomainsAndClientsRadioButton.IsChecked = true;
                        break;
                    case 3:
                        AnonymousModeRadioButton.IsChecked = true;
                        break;
                }

                var dnsServers = await _apiService.GetAsync<Dictionary<string, string>>("https://blockdns.garageit.pl/settings/dns-servers");
                if (dnsServers != null)
                {
                    Dns1TextBox.Text = dnsServers["dns1"];
                    Dns2TextBox.Text = dnsServers["dns2"];
                }

                var dnssec = await _apiService.GetAsync<bool>("https://blockdns.garageit.pl/settings/dnssec");
                DnssecCheckBox.IsChecked = dnssec;

                var dnsBogusPriv = await _apiService.GetAsync<bool>("https://blockdns.garageit.pl/settings/dns-bogus-priv");
                DnsBogusPrivCheckBox.IsChecked = dnsBogusPriv;

                var dnsFqdnRequired = await _apiService.GetAsync<bool>("https://blockdns.garageit.pl/settings/dns-fqdn-required");
                DnsFqdnRequiredCheckBox.IsChecked = dnsFqdnRequired;

                var dnsmasqListening = await _apiService.GetAsync<string>("https://blockdns.garageit.pl/settings/dnsmasq-listening");
                DnsmasqListeningComboBox.SelectedItem = dnsmasqListening;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        private void DisableQueryLogging_Click(object sender, RoutedEventArgs e)
        {
            // Implement your method here
            MessageBox.Show("Query logging disabled.");
        }
    }
}
