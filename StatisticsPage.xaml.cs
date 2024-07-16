using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Threading;
using LiveCharts;
using LiveCharts.Defaults;
using LiveCharts.Wpf;
using Garage.Services;
using Newtonsoft.Json;

namespace Garage
{
    public partial class StatisticsPage : UserControl
    {
        public SeriesCollection SeriesCollection { get; set; }
        public Func<double, string> TimeFormatter { get; set; }
        public List<string> Labels { get; set; }
        private readonly ApiService _apiService;
        private DispatcherTimer _timer;

        public ChartValues<ObservableValue> TotalQueries { get; set; }
        public ChartValues<ObservableValue> BlockedQueries { get; set; }
        public ChartValues<ObservableValue> PercentageBlocked { get; set; }
        public ChartValues<ObservableValue> DomainsOnAdlists { get; set; }

        public StatisticsPage(ApiService apiService)
        {
            InitializeComponent();
            _apiService = apiService;
            InitializeCollections();
            SetupChart();

            // Initialize and start the timer
            _timer = new DispatcherTimer();
            _timer.Interval = TimeSpan.FromMinutes(1); // Set the interval to 1 minute
            _timer.Tick += async (s, e) => await LoadStatistics();
            _timer.Start();
        }

        private void InitializeCollections()
        {
            SeriesCollection = new SeriesCollection();

            TotalQueries = new ChartValues<ObservableValue>();
            BlockedQueries = new ChartValues<ObservableValue>();
            PercentageBlocked = new ChartValues<ObservableValue>();
            DomainsOnAdlists = new ChartValues<ObservableValue>();
        }

        private void SetupChart()
        {
            TimeFormatter = value => DateTime.Today.AddHours(value).ToString("HH:mm");
            Labels = new List<string>();
            DataContext = this;
        }

        private async void Chart_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            await LoadStatistics();
        }

        public async Task LoadStatistics()
        {
            try
            {
                string response = await _apiService.GetStatisticsAsync("https://blockdns.garageit.pl");
                var statistics = JsonConvert.DeserializeObject<Statistics>(response);

                if (statistics == null)
                {
                    Console.WriteLine("Failed to fetch statistics: statistics is null");
                    return;
                }

                TotalQueries.Clear();
                BlockedQueries.Clear();
                PercentageBlocked.Clear();
                DomainsOnAdlists.Clear();

                TotalQueries.Add(new ObservableValue(statistics.DnsQueriesToday));
                BlockedQueries.Add(new ObservableValue(statistics.AdsBlockedToday));
                PercentageBlocked.Add(new ObservableValue(statistics.AdsPercentageToday));
                DomainsOnAdlists.Add(new ObservableValue(int.Parse(statistics.DomainsBlocked.Replace(",", ""))));

                SeriesCollection.Clear();

                SeriesCollection.Add(new ColumnSeries
                {
                    Title = "Total Queries",
                    Values = TotalQueries
                });
                SeriesCollection.Add(new ColumnSeries
                {
                    Title = "Queries Blocked",
                    Values = BlockedQueries
                });
                SeriesCollection.Add(new ColumnSeries
                {
                    Title = "Percentage Blocked",
                    Values = PercentageBlocked
                });
                SeriesCollection.Add(new ColumnSeries
                {
                    Title = "Domains on Adlists",
                    Values = DomainsOnAdlists
                });

                // Ensure these TextBlock elements are defined in the XAML
                TextBlockTotalQueries.Text = statistics.DnsQueriesToday.ToString();
                TextBlockBlockedQueries.Text = statistics.AdsBlockedToday.ToString();
                TextBlockPercentageBlocked.Text = $"{statistics.AdsPercentageToday}%";
                TextBlockDomainsOnAdlists.Text = statistics.DomainsBlocked;

                Labels.Clear();
                for (int i = 0; i < 24; i++)
                {
                    Labels.Add($"{i}:00");
                }

                Console.WriteLine("Statistics loaded successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading statistics: {ex.Message}");
            }
        }
    }

    public class Statistics
    {
        [JsonProperty("dnsQueriesToday")]
        public int DnsQueriesToday { get; set; }

        [JsonProperty("adsBlockedToday")]
        public int AdsBlockedToday { get; set; }

        [JsonProperty("adsPercentageToday")]
        public double AdsPercentageToday { get; set; }

        [JsonProperty("domainsBlocked")]
        public string DomainsBlocked { get; set; }
    }
}
