   M S B A M L   `   `   `  ���� 
  Garage    Garage.DomainsPage   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     -     � 	Resources     PrimaryColor �� Color  SecondaryColor  	TextColor  BackgroundColor  	CardColor  HighlightColor  PanelBackgroundColor  BorderColor  TextBoxBackgroundColor 	 ComboBoxBackgroundColor  
 ComboBoxPopupBackgroundColor  ComboBoxToggleButton �� 
TargetType � ColumnDefinitions ��Name �� CornerRadius F�Name �� Triggers P� Property	 P� Value
 �� 
TargetName �� Value �� Property  ComboBoxTextBox  ComboBoxStyle �� 
TargetType �� 	ClickMode d� 	IsChecked �� Path �� Mode �� RelativeSource J� IsHitTestVisible �� SelectionBoxItem �� SelectionBoxItemTemplate ��Name �� 
IsReadOnly �� 
IsReadOnly �� IsDropDownOpen � AllowsTransparency J� SnapsToDevicePixels � ActualWidth �� MaxDropDownHeight K� IsItemsHost-  'System.Windows.Input.KeyboardNavigation   DirectionalNavigation  P� 
SourceName! �� Triggers  HeaderStyle  
LabelStyle  TextBoxStyle  ButtonStyle  DataGridCellStyle*  $System.Windows.Controls.DataGridCell  DataGridColumnHeaderStyle=  7System.Windows.Controls.Primitives.DataGridColumnHeader  GroupBoxStyle��%�  &	        &	      &	 &     &	 9     &	 L     &	 _     &	 r     &	 �     &	 �     &		 �     &	
 �     &	 �     7  7  7  7  7  7  &	 �    &	 �    7  7  7  7  '�� L    7  7  &	 �    7  &	 �    7  &	 +	    7  &	 �	    7  &	 $
    7  7  &	 �
    7  7  &	     7  7  �� $ #1E1E1E���� $ #FFFFFF���� $ #FFFFFF���� $ #1E1E1E���� $ #2B2B2B���� $ #1E1E1E���� $ #2B2B2B���� $ #CCCCCC���� $ #2B2B2B���� $ #2B2B2B���� $ #1E1E1E���� " d�.R��  �� �� $��20 �.+��� $ Border��$��2��$ 2��#��z��#��z��#��z��F� $ Arrow��$��1��$��Center=�$��Center=�"����        � 	=  	= � z     	8��   P�  �@J�IsMouseOver$
	 True��. ��� $
 Border��8   � ���� $
 Arrow��8   � ��P�  �@d�	IsChecked$
	 TrueY�. ��� $
 Border��8   � ���� $
 Arrow��8   � ��P�  � {�$	 False��. ��� $
 Arrow��8   � ���� " ��.R��� $ PART_ContentHost��$|�False��#��z��#��z��#��z���� " ��.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��
 �������  � ��
 �   ���  � ��8   ��  � ��$ 1q���  � ��$ 5q���  � ��$ Center=���  � �� �� " ��.R�� .+�d� $��ToggleButton��8�� $��2��$|�false��$ Press=�
�������
���   � �� $ IsDropDownOpen�$ TwoWay=� �� *TemplatedParent+�� $��ContentSite��$ False��#��z #��z #��z��$��3,3,23,3q�$��Center=�$
��Left=��� $ PART_EditableTextBox��8�� $
��Left=�$��Center=�$��3,3,23,3q�$
|�True��
���   �
�������$y�Hidden=�# z ��Z� � $��Popup��$��Bottom=�#��z $
 True��$|�False��$��Slide=�.��� $��DropDown��$
 True��#��z #��z .+��� $ DropDownBorder��
���   �8�� $��1q��� $��4,6,4,6q�$
 True��.���� $
 True��$ 	Contained=� P�  �@��HasItems$	 False��. ��� $
 DropDownBorder�� � ��$ 95��P�  �@��
IsGrouping$
	 True��. ���  � ��$ False��P� $  Popup�� �@�AllowsTransparency$
	 True��. ��� $
 DropDownBorder�� �@J�Opacity$
 0.95Q��� " ��.���  � ��
 �������  � ��
 �   ���  � ��$ 30����  � ��$ Center=���  � ��$ Stretch=���  � ��$ 	10,0,10,0q�! P�  �@J�IsMouseOver$
	 True��. ���  � ��8   ��  � ��
 �����P�  �@��
IsSelected$
	 True��. ���  � ��8  ��  � ��
 ������� " ��.���  � ��$ 20(���  � ��8   ��  � ��$ 10q��� " ��.���  � ��$ 16(���  � ��8   ��  � ��$ 5q��� " ��.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000�� " ��.���  � ��$ 30����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000�� "  .���  � ��8   ��  � ��8  ��  � ��$ 0q���  � ��$ 10q���  � ��$ Center=��� "  .���  � ��8   ��  � ��8  ��  � ��$ 0q���  � ��$ 10q���  � ��$ Center=��� " ��.���  � ��$ 0,0,0,20q���  � ��8   ��  �@��Padding$ 10q���  � ��8  ��  � ��$ 1q���  �@��CornerRadius$ 5��.��� #��[ " � RowDefinitions" �� $
��Auto �$
��66.6���� $
��253* ��� $
��242* ��� $
��242* �.+��� $��Zarządzanie domenami��#��[ $��20,20,20,20q�� $��1��$��20,20,20,20q�$��3�� �� $��* �" �� $
��Auto ��� $��* ��� $��* �.+��� $��0��#��[ $��0,0,0,20q�._��� .+��� $��Dodaj nową domenę��#��[ $��10q��� # �� Orientation$# 
Horizontal=�$��	0,10,0,10q�.+��� $��Domena:��#��[ $��Center=��� -   $ domainTextBox��#��[ �� $��
Komentarz:��#��[ $��10,0,0,0q�$��Center=��� -   $ commentTextBox��#��[ �� -   $ ��Name$$ listComboBox��#��[ 
���   �
�������.@��� $��	Dozwolone���� $��Zablokowane���� -   $��Dodaj��#��[ $��10,0,0,0q�$��53���� $# 
Horizontal=�$��	0,10,0,10q�.+��� $��Grupa:��#��[ $��Center=��� -   $ groupTextBox��#��[ �� -   $��Dodaj do grupy��#��[ $��10,0,0,0q�$	��100���� -   $��Usuń z grupy��#��[ $��10,0,0,0q�$	��100���� $��Wskazówki:��#��[ $
��Bold"�$��10,0,0,0q��� $O��I1. Można dodać wiele domen, oddzielając każdą nazwę domeny spacją.��#��[ $��10,0,0,0q��� $o��i2. Nazwy domen mogą zawierać spacje, jeśli są wprowadzone w cudzysłowiu. Na przykład "example.com".��#��[ $��10,0,0,0q�$��42���� $��1��#��[ $��0,17,0,0q�$
��Auto��._��� .+��� $��Domeny Dozwolone��#��[ $��10q�&   System.Windows.Controls.DataGrid  -	   %  Name$% whitelistDataGrid��&   AutoGenerateColumns$& False��#��[ '   GridLinesVisibility$
' None=�$��Stretch=�$��Stretch=�(   CanUserAddRows$( False��)   CanUserDeleteRows$) False��*   SelectionMode$* Single=�$��10q�+   	CellStyle#+ [ ,   ColumnHeaderStyle#, [ 
����������� *WhitelistDomains+-   Columns- 4  .System.Windows.Controls.DataGridCheckBoxColumn  ,  &System.Windows.Controls.DataGridColumn.   Width5  /System.Windows.Controls.DataGridLengthConverter$. 30 1  +System.Windows.Controls.DataGridBoundColumn/   Binding/ �� *
IsSelected+$ TwoWay=�0	  *System.Windows.Controls.DataGridTextColumn	  0   Header$0 Domena��$. * 1   ElementStyle#1 [ / �� *
DomainName+	  $0 	Komentarz��$. * #1 [ / �� *	Comment+	  $0 Grupy��$. * #1 [ / �� *GroupsString+4
  .System.Windows.Controls.DataGridTemplateColumn
  $0 Akcje��$	. 100 2 
  CellTemplate2 �� .R��� $# 
Horizontal=�.+��� -
   $	��❌��$��30��#��[ �� -   $
��🚫��$��30��#��[ �� $��2��#��[ $��0,17,0,0q�$
��Auto��._��� .+��� $��Domeny Zablokowane��#��[ $��10q�  -   $% blacklistDataGrid��$& False��#���  $
' None=�$��Stretch=�$��Stretch=�$( False��$) False��$* Single=�$��10q�#+ [ #, [ 
����������� *BlacklistDomains+-   $. 30 / �� *
IsSelected+$ TwoWay=�	  $0 Domena��$. * #1 [ / �� *
DomainName+	  $0 	Komentarz��$. * #1 [ / �� *	Comment+	  $0 Grupy��$. * #1 [ / �� *GroupsString+
  $0 Akcje��$	. 100 2 �� .R��� $# 
Horizontal=�.+��� -   $	��❌��$��30��#��[ �� -   $��✔️��$��30��#��[ 