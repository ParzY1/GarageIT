   M S B A M L   `   `   `  ���� A  =Garage, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullclr-namespace:GarageGarage      Garage.LoginWindow   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     &localclr-namespace:Garage       � Title$  Login Prone��$	��400��$	��500�����#282C34 � WindowStartupLocation$ CenterScreen=� � 	Resources    PrimaryColor �� Color  	TextColor  BackgroundColor)   #Garage.BooleanToVisibilityConverter   BooleanToVisibilityConverter �� 
TargetType �� Property �� Value �� 
TargetType �� RadiusX	 �� RadiusY3  -System.Windows.Media.Effects.DropShadowEffect
   Color   
BlurRadius   ShadowDepth �� Triggers P� Property P� Value��%P  &	        &	      &	 &     &	 9     '�� >     7  7   �� $ #FF5722���� $ #FFFFFF���� $ #282C34��  �� " ��.���  � ��8   ��  � ��8  ��  � ��$ 16(���  � ��$ 10q���  � ��$ 10q���  � ��
 ���� ��  �@�Cursor$
 Hand����  � ��$ 40����  � �� �� " ��.R�� .+��� #��z��$ 5��$	 5���� $��Center=�$��Center=���  �@J�Effect   $
 Black��$ 5Q�$ 2Q� P�  �@J�IsMouseOver$
 True��. ���  � �� �#FF7043P�  � ��$
 True��. ���  � �� �#FF8A65.��� .+��� $��Center=�$��Center=�.+��� $��	Logowanie��$��24(�#��[ $
��Bold"�$��0 0 0 20q�$��Center=�� $
��0 10q�$	��300��$��40��.+��� -   $��UsernameTextBox��$	��300��$��40��$��Center=�$��16(�$��10q����#3B3F45���#FFFFFF$��0q��� $��Nazwa użytkownika��
�������$��Center=�$��5,0,0,0q� J� IsHitTestVisible$
 True��y��� *Text+ �� ElementName$ UsernameTextBox�� �� 	Converter# [ � $
��0 10q�$	��300��$��40��.+�G� -   $��PasswordBox��$	��300��$��40��$��Center=�$��16(�$��10q����#3B3F45���#FFFFFF$��0q��� $��Hasło��
�������$��Center=�$��5,0,0,0q�$
 True��y��� *
Password+$ PasswordBox��# [ �� -   $��LoginButton��$��Zaloguj��$	��300��