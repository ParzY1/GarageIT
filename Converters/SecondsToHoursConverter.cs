using System;
using System.Globalization;
using System.Windows.Data;

namespace Garage.Converters
{
    public class SecondsToHoursConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is double seconds)
            {
                var hours = TimeSpan.FromSeconds(seconds).TotalHours;
                Console.WriteLine($"Converting {seconds} seconds to {hours:F2} hours."); // Debug output
                return $"{hours:F2} h";
            }

            return value;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
