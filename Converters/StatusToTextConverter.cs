using System;
using System.Globalization;
using System.Windows.Data;

namespace Garage.Converters
{
    public class StatusToTextConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is int enabled)
            {
                return enabled == 1 ? "Włączony" : "Wyłączony";
            }
            return "Nieznany";
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
