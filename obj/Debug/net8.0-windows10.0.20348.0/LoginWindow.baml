   M S B A M L   `   `   `  ����A  =Garage, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullclr-namespace:GarageGarage  5   	       Garage.LoginWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   &localclr-namespace:Garage     5   	     � Title$  Login Prone��5   	   $	��400��6   $	��500��6*   ���#282C34 � WindowStartupLocation$ CenterScreen=�5       � 	Resources 5         PrimaryColor �� Color  	TextColor  BackgroundColor)   #Garage.BooleanToVisibilityConverter   BooleanToVisibilityConverter �� 
TargetType �� Property �� Value �� 
TargetType �� RadiusX	 �� RadiusY3  -System.Windows.Media.Effects.DropShadowEffect
   Color   
BlurRadius   ShadowDepth �� Triggers P� Property P� Value��%  &	        &	 !     &	 B     &	 c     '�� v     7  7   �� 5   
   $ #FF5722��6/   �� 5	   
   $ #FFFFFF��6,   �� 5
   
   $ #282C34��62     5   
   6-   �� 5   
   " ��6   .�5      ��  � ��8   6+   �� 5       � ��8  6+   �� 5       � ��$ 16(�6)   �� 5       � ��$ 10q�6(   �� 5       � ��$ 10q�6'   �� 5       � ��
 ���� 6,   �� 5       �@�Cursor$
 Hand��6'   �� 5       � ��$ 40��6'   �� 5       � �� 5      �� 5      " ��6&   .R�5      � .+�5      �� #��z��6(   $ 5��6L   $	 5��6X   �� 5      $��Center=�6/   $��Center=�6L   5      5      5      �� 5       �@J�Effect 5         5!      $
 Black��6'   $ 5Q�65   $ 2Q�6D   5#       5$      P� 5%       �@J�IsMouseOver$
 True��61   . �5&      ��  � �� �#FF704363   5'      P� 5(       � ��$
 True��6/   . �5)      ��  � �� �#FF8A6563   5*      5,      5-      .��5.      � .+�5/   
   �� $��Center=�6   $��Center=�60   .+�50      �� $��	Logowanie��6   $��24(�6)   #��[ 67   $
��Bold"�6_   $��0 0 0 20q�6q   $��Center=�6�   � 51      $
��0 10q�6   $	��300��6!   $��40��6-   .+�52      �� -   5        $��UsernameTextBox��52      $	��300��61   $��40��6=   $��Center=�6I   $��16(�6k   $��10q�6y   ���#3B3F45���#FFFFFF$��0q�6�   �� 53      $��Nazwa użytkownika��6   
�������$��Center=�6H   $��5,0,0,0q�6c    J� IsHitTestVisible$
 True��6t   y�6�   �� *Text+ �� ElementName$ UsernameTextBox�� �� 	Converter# [ 54      � 55      $
��0 10q�6   $	��300��6!   $��40��6-   .+�56      G� -   5        $��PasswordBox��56      $	��300��61   $��40��6=   $��Center=�6I   $��16(�6k   $��10q�6y   ���#3B3F45���#FFFFFF$��0q�6�   �� 57      $��Hasło��6   
�������$��Center=�6;   $��5,0,0,0q�6V   $
 True��6g   y�6   �� *
Password+$ PasswordBox��# [ 58      �� 59      -   5        $��LoginButton��59   '   $��Zaloguj��6   $	��300��6:   6F   5:      5;      5<      