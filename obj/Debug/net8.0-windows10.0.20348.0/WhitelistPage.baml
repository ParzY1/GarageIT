   M S B A M L   `   `   `  ����A  =Garage, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:Garage.ConvertersGarage.Converters  5          Garage.WhitelistPage   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      1localclr-namespace:Garage.Converters     5      -   5          � 	Resources  5
         BackgroundColor �� Color  	TextColor  	CardColor  BorderColor  TextBoxBackgroundColor  ComboBoxBackgroundColor   ComboBoxPopupBackgroundColor  DataGridRowBackgroundColor ) %DataGridAlternatingRowBackgroundColor/   )Garage.Converters.SecondsToHoursConverter 	 SecondsToHoursConverter 
 HeaderStyle �� 
TargetType �� Property �� Value  
LabelStyle  TextBoxStyle  ComboBoxItemStyle  ComboBoxStyle �� 
TargetType d�Name �� 	ClickMode d� 	IsChecked	 �� Path
 �� RelativeSource �� Mode �Name �� IsDropDownOpen � AllowsTransparency �Name J� SnapsToDevicePixels � ActualWidth �� MaxDropDownHeight ��Name K� IsItemsHost-  'System.Windows.Input.KeyboardNavigation   DirectionalNavigation  ButtonStyle  DataGridCellStyle*  $System.Windows.Controls.DataGridCell  DataGridColumnHeaderStyle=  7System.Windows.Controls.Primitives.DataGridColumnHeader  GroupBoxStyle��%�  &	        &	 !     &	 B     &	 c     &	 �     &	 �     &	 �     &	 �     &	     &		 )    &	
 <    7  &	 �    7  &	 S    7  7  7  &	 C    7  7  &	 �    7  7  7  7  7  7  7  &	 �    7  7  7  &	 �    7  7  &	 �	    7  7  &	 g
    7  7  �� 5   
   $ #1E1E1E��62   �� 5   
   $ #FFFFFF��6,   �� 5   
   $ #2B2B2B��6,   �� 5   
   $ #CCCCCC��6.   �� 5   
   $ #2B2B2B��69   �� 5   
   $ #2B2B2B��6:   �� 5   
   $ #1E1E1E��6?   �� 5   
   $ #2B2B2B��6=   �� 5   
   $ #3B3B3B��6H     5   
   6(   �� 5   
   " ��6$   .�5      ��  � ��$ 20(�6)   �� 5       � ��8   6+   �� 5       � ��$ 10q�6'   5      �� 5   
   " ��6#   .�5      ��  � ��$ 16(�6)   �� 5       � ��8   6+   �� 5        � ��$ 5q�6'   5!      �� 5#   
   " ��6%   .�5$      ��  � ��$	 200��6&   �� 5%       � ��$ 30��6'   �� 5&       � ��$ 5q�6'   �� 5'       � ��8   6+   �� 5(       � ��8  6+   �� 5)       � ��8  6,   5*      �� 5,   
   " ��6*   .�5-      ��  � ��8   6+   �� 5.       � ��8  6+   5/      �� 51   
   " ��6&   .�52      ��  � ��$	 200��6&   �� 53       � ��$ 30��6'   �� 54       � ��$ 5q�6'   �� 55       � ��8   6+   �� 56       � ��8  6+   �� 57       � ��8  6,   �� 58       � ��8  63   �� 59       � �� 5:      �� 5;      " ��6&   .R�5<      � .+�5=      d� $ ToggleButton��6+   #��z��5>   +   #��z��5?   +   #��z��5@   +   #��z��5A   +   $ Press=�5B   +    5C   +   �� $	 IsDropDownOpen�
 �� *TemplatedParent+$ TwoWay=�.��5D   "   �� 5E      � 5F      $ Popup��6$   #��z 5G   $   $��Bottom=�5H   $   $|�False��5I   $   $
 True��5J   $   $��Slide=�5K   $   .��5L   "   � $ DropDown��6'   $
 True��5M   '   #��z 5N   '   #��z 5O   '   8�� .+�5Q   &   �� $ DropDownBorder��6-   8�� #��z��5S   -   $��1q�5T   -   �� 5U   &   $��4,6,4,6q�63   $
 True��5V   3   .��5W   *   �� $
 True��65   $ 	Contained=�5X   5   8�� 5Y   5   5Z   '   5[   #   5\      5]      5^      5`      5a      �� 5c   
   " ��6$   .�5d      ��  � ��$	 100��6&   �� 5e       � ��$ 30��6'   �� 5f       � ��$ 5q�6'   �� 5g       � ��8   6+   �� 5h       � ��8  6+   �� 5i       � ��8  6,   5j      �� 5l   
   "  6*   .�5m      ��  � ��8   6+   �� 5n       � ��8  6+   �� 5o       � ��$ 0q�60   �� 5p       � ��$ 10q�6(   �� 5q       � ��$ Center=�69   5r      �� 5t   
   "  62   .�5u      ��  � ��8   6+   �� 5v       � ��8  6+   �� 5w       � ��$ 0q�60   �� 5x       � ��$ 10q�6(   �� 5y       � ��$ Center=�69   5z      �� 5|   
   " ��6&   .�5}      ��  � ��$ 0,0,0,20q�6'   �� 5~       � ��8   6+   �� 5       �@��Padding$ 10q�6(   �� 5�       � ��8  6,   �� 5�       � ��$ 1q�60   �� 5�       �@��CornerRadius$ 5��6-   5�      5�      .��5�      � #��[  6    � RowDefinitions 5�   
   �� 5�      $
��Auto �6   �� 5�      $��* �6   .+�5�   
   �� $��Dziennik zdarzeń��6   #��[
 6,   $��20q�6Q   � 5�   
   $��1��6   $��20q�6    � ColumnDefinitions 5�      �� 5�      $��* �6#    5�      �� 5�      $
��Auto �6    �� 5�      $��* �6    .+�5�      &   System.Windows.Controls.DataGrid  -   5          Name$ RecentQueriesDataGrid��5�         AutoGenerateColumns$ False��66   #��[  6R      GridLinesVisibility$
 None=�5�      $��Stretch=�62   $��Stretch=�6P      CanUserAddRows$ False��5�         CanUserDeleteRows$ False��6.      SelectionMode$ Single=�6H   $��10q�6_      	CellStyle# [ 5�         ColumnHeaderStyle# [ 6F       AlternatingRowBackground#  [ 5�      $
��True��5�      $
��Auto=�6<   !   
IsReadOnly$
! True��6l   "   Columns" 5�      0  *System.Windows.Controls.DataGridTextColumn  5�      ,  &System.Windows.Controls.DataGridColumn#   Header$
# Czas��6)   $   Width5  /System.Windows.Controls.DataGridLengthConverter$$ * 6�   1	  +System.Windows.Controls.DataGridBoundColumn% 	  ElementStyle#% [ 6�   & 	  Binding& 67   �� *Time+' �� 	Converter#' [	 6�     5�      $	# Typ��6)   $$ * 6O   #% [ 6Y   & 66   �� *Type+6Y     5�      $# Domena��6)   $$ * 6T   #% [ 6^   & 69   �� *Domain+6^     5�      $# Klient��6)   $$ * 6T   #% [ 6^   & 69   �� *Client+6^     5�      $# Status��6)   $$ * 6T   #% [ 6^   & 69   �� *Status+6^     5�      $# 
Odpowiedź��6)   $$ * 6V   #% [ 6`   & 6<   �� *Reply+6`   4
  .System.Windows.Controls.DataGridTemplateColumn
  5�      $# Akcja��6-   $
$ Auto 6<   ( 
  CellTemplate( 5�      �� 5�      .R�5�   "   �� -   5        $��X��5�   )   #��[ 65   6Z   5�      5�      5�      5�      5�      5�      