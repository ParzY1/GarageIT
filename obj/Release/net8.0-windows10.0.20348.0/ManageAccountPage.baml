   M S B A M L   `   `   `  ���� 
  Garage    Garage.ManageAccountPage   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006       � 	Resources     BackgroundColor �� Color  	TextColor  PlaceholderTextColor ! DataGridHeaderBackgroundColor ! DataGridHeaderForegroundColor  ComboBoxBackgroundColor  ComboBoxItemBackgroundColor  ComboBoxItemForegroundColor  ButtonBackgroundColor 	 ButtonForegroundColor 
 DataGridGridLinesBrush  HeaderStyle �� 
TargetType �� Property �� Value  
LabelStyle  TextBoxStyle  ComboBoxStyle �� 
TargetType d�Name �� 	ClickMode d� 	IsChecked	 �� Path
 �� Mode �� RelativeSource �� SelectionBoxItem �� SelectionBoxItemTemplate �� ResourceKey �Name �� IsDropDownOpen � AllowsTransparency �Name J� SnapsToDevicePixels � ActualWidth �� MaxDropDownHeight ��Name K� IsItemsHost-  'System.Windows.Input.KeyboardNavigation   DirectionalNavigation  ComboBoxItemStyle  ButtonStyle  DataGridCellStyle*  $System.Windows.Controls.DataGridCell  DataGridColumnHeaderStyle=  7System.Windows.Controls.Primitives.DataGridColumnHeader  DataGridRowStyle)  #System.Windows.Controls.DataGridRow  DataGridStyle&   System.Windows.Controls.DataGrid��%�  &	        &	      &	 &     &	 6     &	 I     &	 \     &	 o     &	 �     &	 �     &		 �     &	
 �     &	 �     7  &	     7  &	 c    7  &	 �    7  7  7  7  0�� $! ComboBoxItemForegroundColor��17  7  7  &	 O    7  7  &	 �    7  &	 n    7   7  &	 �    7  7  &	 Z    7   7  7   &	 �    7   7  7 
 7 
 �� $ #1E1E1E���� $ #FFFFFF���� $
 Gray���� $ #1E1E1E���� $ #FFFFFF���� $ #2B2B2B���� $ #2B2B2B���� $ #FFFFFF���� $ #2B2B2B���� $ #FFFFFF���� $ #1E1E1E���� " ��.���  � ��$ 20(���  � ��8   ��  � ��$ 10q��� " ��.���  � ��$ 16(���  � ��8   ��  � ��$ 5q��� " ��.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000�� " ��.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � ��8  ��  � �� �#000000��  � �� �� " ��.R�� .+�d� $ ToggleButton��$��2��$|�False��$ Press=�8�� 8��  �� $	 IsDropDownOpen�$
 TwoWay=� �� *TemplatedParent+.���� #��z #��z #��z��$��3,3,23,3q�$��Center=�$
��Left=���2 � $ Popup��$��Bottom=�#��z $
 True��$|�False��$��Slide=�.��� $ DropDown��$
 True��#��z #��z .+��� $ DropDownBorder��8�� 8�� �� $��4,6,4,6q�$
 True��.���� $
 True��$ 	Contained=�8�� �� " ��.���  � ��8   ��  � ��8  ��  � ��$
 Left=���  � ��$ Center=���  � ��$ 2q���  � ��$ 1q���  � ��$ 0q��� " ��.���  � ��$	 100����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000�� "  .���  � ��8   ��  � ��8  ��  � ��$ 0q���  � ��$ 10q���  � ��$ Center=��� "  .���  � ��8   ��  � ��8  ��  � ��$ 0q���  � ��$ 10q���  � ��$ Center=��� "  .���  � ��8   ��  � ��8  ��  � ��8  ��  � ��$ 0q��� "  .���  � ��8   ��  � ��8  ��  �@ GridLinesVisibility$
 None=���   �@ HorizontalGridLinesBrush8  ��  �@ VerticalGridLinesBrush8  .��� $��10q�#��[  .+��� $$��Zarządzanie grupami klientów��$��24(�$
��Bold"�$��0,0,0,20q�#��[ �� $��Dodaj nowego klienta��$��0,40,0,0q�#��[  #��[ .���� $��10q�.+���  �� Orientation$ 
Horizontal=�$	��712��.+��� $��Klienci:��$��Center=�$��52��#��[ �� -    ��Name$ ClientNameTextBox��$	��200��#��[ �� $��
Komentarz:��$��Center=�$��94��$��10,0,0,0q�#��[ �� -   $ CommentTextBox��$	��200��#��[ �� $k��eMożesz wybrać istniejącego klienta lub dodać nowego, wpisując powyżej i potwierdzając enterem.��$
��Wrap=�$��0,10,0,0q�#��[ �� $����Klienci mogą być opisani poprzez adresy IP (IPv4 i IPv6 są obsługiwane), podsieci IP (notacja CIDR, np. 192.168.2.0/24), adresy MAC (np. 12:34:56:78:9A:BC), nazwy hostów (np. localhost) lub interfejsy, do których są podłączone (poprzedzone dwukropkiem, np. :eth0).��$
��Wrap=�$��0,10,0,0q�#��[ �� -   $��Dodaj��$
��Left=�$	��100��$��0,10,0,0q�#��[ �� $ 
Horizontal=�$��	0,10,0,10q�.+��� $��Grupa:��#��[ $��Center=��� -   $ clientGroupTextBox��#��[ �� -   $��Dodaj do grupy��#��[ $��10,0,0,0q�$	��100���� -   $��Usuń z grupy��#��[ $��10,0,0,0q�$	��100���� $&�� Lista skonfigurowanych klientów��$��	0,300,0,0q�#��[  #��[ .���� $
��Auto=�$��-5,0,5,0q�.��� $��10q� � RowDefinitions �� $
��Auto ��� $��* �.+��� $ 
Horizontal=�$��0��.+��� $��Pokaż��$��Center=�#��[ �� $��50��$
��10,0q�#��[ .@��� $��10�� �� 
IsSelected$
 True��#��[ �� $��25��#��[ �� $��50��#��[ �� $��wpisów��$��Center=�$
��10,0q�#��[   -     Name$ configuredClientsDataGrid��$��1��   AutoGenerateColumns$ False��   CanUserAddRows$ False��$��0,10,0,0q�    ColumnHeaderStyle#  [ !   	CellStyle#! [ "   RowStyle#" [ #��[ #   Columns# 4  .System.Windows.Controls.DataGridCheckBoxColumn  ,  &System.Windows.Controls.DataGridColumn$   Width5  /System.Windows.Controls.DataGridLengthConverter$$ 50 0	  *System.Windows.Controls.DataGridTextColumn	  %   Header$% Id��$$ 50 1
  +System.Windows.Controls.DataGridBoundColumn& 
  Binding& �� *Id+	  $% IP��$$ * & �� *Ip+	  $% 
Date Added��$$ * & �� *	DateAdded+	  $% Date Modified��$$ * & �� *DateModified+	  $% 	Komentarz��$$ * & �� *	Comment+	  $% Grupy��$	$ 150 & �� *Groups+4  .System.Windows.Controls.DataGridTemplateColumn  $
$ Auto '   CellTemplate' �� .R��� $ 
Horizontal=�.+��� -   $
��📝��$��30��#��[ �� -	   $	��❌��$��30��#��[ 