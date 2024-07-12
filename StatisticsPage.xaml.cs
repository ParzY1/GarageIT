using System;
using System.Collections.Generic;
using System.Windows.Controls;
using LiveCharts;
using LiveCharts.Defaults;
using LiveCharts.Wpf;

namespace Garage
{
    public partial class StatisticsPage : UserControl
    {
        public SeriesCollection SeriesCollection { get; set; }
        public Func<double, string> TimeFormatter { get; set; }
        public List<string> Labels { get; set; }

        public StatisticsPage()
        {
            InitializeComponent();
            SetupChart();
        }

        private void SetupChart()
        {
            // Inicjalizacja SeriesCollection i dodanie przykładowych danych
            SeriesCollection = new SeriesCollection
            {
                new ColumnSeries
                {
                    Title = "Total Queries",
                    Values = new ChartValues<ObservableValue>
                    {
                        new ObservableValue(10), // Przykładowe dane
                        new ObservableValue(20),
                        new ObservableValue(30),
                        new ObservableValue(25)
                    },
                    Fill = System.Windows.Media.Brushes.Blue
                },
                new ColumnSeries
                {
                    Title = "Queries Blocked",
                    Values = new ChartValues<ObservableValue>
                    {
                        new ObservableValue(5), // Przykładowe dane
                        new ObservableValue(15),
                        new ObservableValue(12),
                        new ObservableValue(8)
                    },
                    Fill = System.Windows.Media.Brushes.Orange
                },
                new ColumnSeries
                {
                    Title = "Percentage Blocked",
                    Values = new ChartValues<ObservableValue>
                    {
                        new ObservableValue(15), // Przykładowe dane
                        new ObservableValue(10),
                        new ObservableValue(20),
                        new ObservableValue(18)
                    },
                    Fill = System.Windows.Media.Brushes.Yellow
                },
                new ColumnSeries
                {
                    Title = "Domains on Adlists",
                    Values = new ChartValues<ObservableValue>
                    {
                        new ObservableValue(8), // Przykładowe dane
                        new ObservableValue(12),
                        new ObservableValue(5),
                        new ObservableValue(10)
                    },
                    Fill = System.Windows.Media.Brushes.Green
                }
            };

            // Konfiguracja formatowania osi X
            TimeFormatter = value => DateTime.Today.AddHours(value).ToString("HH:mm");

            // Konfiguracja etykiet osi X (labels)
            Labels = new List<string>();
            for (int i = 0; i < 4; i++)
            {
                Labels.Add($"Label {i + 1}");
            }

            DataContext = this;
        }

        private void Chart_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {

        }
    }
}
