using Garage.Services;
using System.Windows;
using System.Windows.Controls;

namespace Garage
{
    public partial class BlacklistPage : UserControl
    {
        private readonly ApiService _apiService;

        public BlacklistPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
        }

        private void BlacklistPage_Loaded(object sender, RoutedEventArgs e)
        {
            // Logic to handle page loaded event
        }

        private void AddToBlacklist_Click(object sender, RoutedEventArgs e)
        {
            // Logic to add domain to blacklist
        }

        private void RemoveFromBlacklist_Click(object sender, RoutedEventArgs e)
        {
            // Logic to remove domain from blacklist
        }
    }
}
