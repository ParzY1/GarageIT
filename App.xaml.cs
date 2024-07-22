using System;
using System.Windows;

namespace Garage
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            // Pokaż LoginWindow
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.LoginSuccessful += (sender, args) =>
            {
                // Pokaż MainWindow po pomyślnym zalogowaniu
                MainWindow mainWindow = new MainWindow();
                mainWindow.WindowState = WindowState.Maximized;
                mainWindow.Show();

                // Zamknij LoginWindow
                loginWindow.Close();
            };
            loginWindow.ShowDialog();
        }
    }
}
