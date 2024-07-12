using System;
using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

namespace Garage
{
    public class StatusToColorConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is string status)
            {
                if (status.Equals("Enabled", StringComparison.OrdinalIgnoreCase))
                {
                    return Brushes.Green; // Zielony kolor dla statusu "Enabled"
                }
                else if (status.Equals("Disabled", StringComparison.OrdinalIgnoreCase))
                {
                    return Brushes.Red; // Czerwony kolor dla statusu "Disabled"
                }
            }
            return Brushes.Gray; // Domyślny kolor
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
