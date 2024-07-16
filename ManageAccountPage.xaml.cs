using Garage.Services;
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
        }

        private void AddClient_Click(object sender, RoutedEventArgs e)
        {
            // Logic to add client
        }

        private void RemoveClient_Click(object sender, RoutedEventArgs e)
        {
            // Logic to remove client
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Logic to handle text change event
        }
    }
}
