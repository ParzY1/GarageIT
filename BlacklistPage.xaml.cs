using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;

namespace Garage
{
    public partial class BlacklistPage : UserControl
    {
        public ObservableCollection<Group> Groups { get; set; }

        public BlacklistPage()
        {
            InitializeComponent();
            DataContext = this;
            Groups = new ObservableCollection<Group>
            {
                new Group { Name = "Default", Status = "Enabled", Description = "The default group" },
                new Group { Name = "Test Group", Status = "Enabled", Description = "This is a test group" }
            };
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            var groupName = groupNameTextBox.Text;
            var groupDescription = groupDescriptionTextBox.Text;

            if (!string.IsNullOrWhiteSpace(groupName))
            {
                Groups.Add(new Group { Name = groupName, Status = "Enabled", Description = groupDescription });
                groupNameTextBox.Clear();
                groupDescriptionTextBox.Clear();
            }
            else
            {
                MessageBox.Show("Group name cannot be empty.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (groupsDataGrid.SelectedItem is Group selectedGroup)
            {
                Groups.Remove(selectedGroup);
            }
            else
            {
                MessageBox.Show("Please select a group to delete.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void StatusButton_Click(object sender, RoutedEventArgs e)
        {
            if (groupsDataGrid.SelectedItem is Group selectedGroup)
            {
                // Toggle status between Enabled and Disabled
                selectedGroup.Status = (sender as ToggleButton)?.Content.ToString();
            }
        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            // Implementacja logiki obsługi kliknięcia przycisku "Edytuj"
            // Może być pusta na razie, jeśli nie ma potrzeby obsługi tego kliknięcia
        }

        private void groupsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }
    }

    public class Group
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
    }
}
