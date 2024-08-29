using Garage.Services;
using Newtonsoft.Json;
using System;
using System.Windows;

namespace Garage
{
    public partial class LoginWindow : Window
    {
        public event EventHandler LoginSuccessful; // Event to signal successful login
        private ApiService _apiService;

        public LoginWindow()
        {
            InitializeComponent();
            // Initialize ApiService with a base URL
            _apiService = new ApiService("https://blockdns.garageit.pl");
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string identifier = UsernameTextBox.Text; // Use identifier instead of username
            string password = PasswordBox.Password;

            try
            {
                // Perform login
                string loginResponse = await _apiService.LoginUser(identifier, password);
                dynamic loginData = JsonConvert.DeserializeObject<dynamic>(loginResponse);

                if (loginData != null && loginData.token != null)
                {
                    // Set bearer token
                    _apiService.SetBearerToken(loginData.token.ToString());

                    // Get the assigned server and ensure it has the correct URI format
                    string assignedServer = loginData.assignedServer.ToString();

                    // Ensure the assignedServer starts with a valid protocol (http or https)
                    if (!assignedServer.StartsWith("http://") && !assignedServer.StartsWith("https://"))
                    {
                        assignedServer = "https://" + assignedServer; // Assuming HTTPS as the default protocol
                    }

                    // Create a new instance of ApiService with the updated base URL
                    _apiService = new ApiService(assignedServer);

                    // Set the bearer token again for the new ApiService instance
                    _apiService.SetBearerToken(loginData.token.ToString());

                    // Signal successful login
                    LoginSuccessful?.Invoke(this, EventArgs.Empty);
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
