using Garage.Services;
using System.Windows.Controls;

namespace Garage
{
    public partial class SettingsPage : UserControl
    {
        private readonly ApiService _apiService;

        public SettingsPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
        }
    }
}
