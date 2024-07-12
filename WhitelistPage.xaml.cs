using System.Collections.Generic;
using System.Windows.Controls;

namespace Garage
{
    /// <summary>
    /// Interaction logic for WhitelistPage.xaml
    /// </summary>
    public partial class WhitelistPage : UserControl
    {
        public WhitelistPage()
        {
            InitializeComponent();
            LoadSampleData();
        }

        private void LoadSampleData()
        {
            // Create sample data
            var sampleData = new List<Query>
            {
                new Query { Time = "10:00", Type = "A", Domain = "example.com", Client = "Client1", Status = "Allowed", Reply = "192.168.1.1", Action = "None" },
                new Query { Time = "10:05", Type = "AAAA", Domain = "example.org", Client = "Client2", Status = "Blocked", Reply = "-", Action = "None" }
            };

            // Set the data context of the DataGrid to the sample data
            RecentQueriesDataGrid.ItemsSource = sampleData;
        }

        private void RecentQueriesDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }
    }

    public class Query
    {
        public string Time { get; set; }
        public string Type { get; set; }
        public string Domain { get; set; }
        public string Client { get; set; }
        public string Status { get; set; }
        public string Reply { get; set; }
        public string Action { get; set; }
    }
}
