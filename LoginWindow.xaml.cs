using System;
using System.Windows;
using Newtonsoft.Json;
using Garage.Services;

namespace Garage
{
    public partial class LoginWindow : Window
    {
        public event EventHandler LoginSuccessful; // Zdarzenie sygnalizujące pomyślne zalogowanie

        private readonly ApiService _apiService;

        public LoginWindow()
        {
            InitializeComponent();
            _apiService = new ApiService();
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text;
            string password = PasswordBox.Password;

            try
            {
                string loginResponse = await _apiService.LoginUser("https://blockdns.garageit.pl", username, password);
                dynamic loginData = JsonConvert.DeserializeObject<dynamic>(loginResponse);

                if (loginData != null)
                {
                    // Podnieś zdarzenie informujące o pomyślnym zalogowaniu
                    LoginSuccessful?.Invoke(this, EventArgs.Empty);

                    // Ukryj LoginWindow
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("Invalid username or password", "Login failed", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Login failed: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
