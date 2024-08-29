using System;
using System.Windows;

namespace Garage
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            // Initialize and show the LoginWindow
            LoginWindow loginWindow = new LoginWindow();

            loginWindow.LoginSuccessful += (sender, args) =>
            {
                // Initialize and show the MainWindow upon successful login
                MainWindow mainWindow = new MainWindow
                {
                    WindowState = WindowState.Maximized
                };

                // Show the MainWindow
                mainWindow.Show();

                // Close the LoginWindow
                loginWindow.Close();
            };

            // Show the LoginWindow as a dialog
            loginWindow.ShowDialog();
        }
    }
}
