   M S B A M L   `   `   `  ���� A  =Garage, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullclr-namespace:GarageGarage      Garage.MainWindow   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     &localclr-namespace:Garage       � Title$  Panel sterowania Garage��$	��800��$
��1200�����#282C34 � WindowStartupLocation$ CenterScreen=� � 	Resources    PrimaryColor �� Color  SecondaryColor  	TextColor  BackgroundColor  	CardColor  HighlightColor  PanelBackgroundColor  SidebarButtonStyle �� 
TargetType �� Property �� Value��%�  &	        &	      &	 &     &	 9     &	 L     &	 _     &	 r     &	 �     7  7  �� $ #4CAF50���� $ #2196F3���� $ #FFFFFF���� $ #282C34���� $ #3B3F45���� $ #FF5722���� $ #2E3338���� " ��.���  � ��8   ��  � ��8  ��  � ��$ 18(���  � ��$ 5q���  � ��$	 0 5q���  � ��
 ���� ��  �@�Cursor$
 Hand����  � ��$ Stretch=���  � ��$ 60����  � ��$
 Left=�.���  � ColumnDefinitions �� $	��300 ��� .+��� $��0��#��[ .+��� #��[ $��26(�$
��Bold"�$��20 20q� �� TextAlignment$ Center=�Panel Prone�� -   #��[ ���� 	 �� Orientation$	 
Horizontal=�.+��� $,��&pack://application:,,,/Images/home.png��$��32��$��32��$��	0 10 10 0q��� $��Panel główny��$��Center=�#��[ �� -   #��[ ���� $	 
Horizontal=�.+��� $0��*pack://application:,,,/Images/querylog.png��$��32��$��32��$��	0 10 10 0q��� $��Logi zapytań��$��Center=�#��[ �� -   #��[ ���� $	 
Horizontal=�.+��� $-��'pack://application:,,,/Images/group.png��$��32��$��32��$��	0 10 10 0q��� $��Grupy��$��Center=�#��[ �� -   #��[ ���� $	 
Horizontal=�.+��� $.��(pack://application:,,,/Images/client.png��$��32��$��32��$��	0 10 10 0q��� $��Klienci��$��Center=�#��[ �� -   #��[ ���� $	 
Horizontal=�.+��� $/��)pack://application:,,,/Images/domains.png��$��32��$��32��$��	0 10 10 0q��� $��Domeny��$��Center=�#��[ �� -   #��[ ���� $	 
Horizontal=�.+��� $0��*pack://application:,,,/Images/settings.png��$��32��$��32��$��	0 10 10 0q��� $��
Ustawienia��$��Center=�#��[ � $��1��#��[ 
 � RowDefinitions
 �� $	��36* ��� $��8* ��� $��3* ��� $	��24* ��� $��7* ��� $
��567* ��� $
��139* �.+� � -     �Name$ MainContent��#��[   � NavigationUIVisibility$ Hidden=�$��
10,0,0,133q�$��7��� $	��Top=�#��[ $��0,11,0,0q�$��6�� �� $��7.999 ��� $��213.093 ��� 