using Garage.Services;
using System.Windows;
using System.Windows.Controls;

namespace Garage
{
    public partial class DomainsPage : UserControl
    {
        private readonly ApiService _apiService;

        public DomainsPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
        }

        private void DomainsPage_Loaded(object sender, RoutedEventArgs e)
        {
            // Logic to handle page loaded event
        }

        private void AddToDomains_Click(object sender, RoutedEventArgs e)
        {
            // Logic to add domain
        }

        private void RemoveFromDomains_Click(object sender, RoutedEventArgs e)
        {
            // Logic to remove domain
        }
    }
}
