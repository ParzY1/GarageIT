   M S B A M L   `   `   `  ����U  QLiveCharts.Wpf, Version=0.9.7.0, Culture=neutral, PublicKeyToken=0bc1f845d1ebb8dfG4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.WpfLiveCharts.Wpf  5      
 Garage   Garage.StatisticsPage   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      Dlvc4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.Wpf     5      $	��669��5   "   .��5	      � $��20q�6   .+�5
   
   � $	��Top=�6   $��-3,4,0,0q�6'   $	��174��69     � ColumnDefinitions  5      �� 5      $��* �6#   �� 5      $��* �6#   �� 5      $��* �6#   �� 5      $��* �6#   .+�5      �� $��0��6   ���#2196F3 �� Padding$ 10q�6:    �� CornerRadius$ 10��6G   $��10q�6Y   ._�5      �� $��	15,36,0,0q�6   .+�5      �� $��Total Queries��6    
�������$
��Bold"�6H   $��16(�6Z   �� 5      -   5         ��Name$ TextBlockTotalQueries��5       $��0��6?   
�������$��24(�6[   $
��Bold"�6i   �� 5      $��0 active clients��6    
�������$��12(�6K   5      5      �� 5      $��1��6   ���#FF5722$ 20q�6:   $ 10��6G   $��10q�6Y   ._�5      �� $��0,20,0,0q�6   .+�5      �� $��Queries Blocked��6    
�������$
��Bold"�6J   $��16(�6\   �� 5      -   5        $ TextBlockBlockedQueries��5       $��0��6A   
�������$��24(�6]   $
��Bold"�6k   �� 5      $��List blocked queries��6    
�������$��12(�6O   5      5       �� 5"      $��2��6   ���#FFC107$ 20q�6:   $ 10��6G   $��	10,9,8,11q�6Y   ._�5#      �� $��-10,23,-5,3q�6   .+�5$      �� $��Percentage Blocked��6    
�������$
��Bold"�6M   $��16(�6_   $��21��6m   $	��156��6y   �� 5%      -   5        $  TextBlockPercentageBlocked��5%       $��0%��6D   
�������$��24(�6a   $
��Bold"�6o   $��26��6�   $	��155��6�   $��Center=�6�   $	��Top=�6�   �� 5&      $��List all queries��6    
�������$��12(�6K   5'      5(      �� 5*      $��3��6   ���#4CAF50$ 20q�6:   $ 10��6G   $��10q�6Y   ._�5+      �� $��-9,28,-10,0q�6   .+�5,      �� $��Domains on Adlists��6    
�������$
��Bold"�6M   $��16(�6_   �� 5-      -   5        $ TextBlockDomainsOnAdlists��5-       $��0��6C   
�������$��24(�6_   $
��Bold"�6m   �� 5.      $��Manage adlists��6    
�������$��12(�6I   5/      50      51      �� 53   
   ���#2D2D2D$ 20q�6&   $ 10��63   $��10,205,10,5q�6E   ._�54      �� .+�55      �� $&�� Total queries over last 24 hours��6   
�������$
��Bold"�6W   $��18(�6i   $��0,0,0,10q�6w   �� 56      ���#1D1D1D$ 10q�6.   $ 5��6;   $	��340��6L   ._�57      #   LiveCharts.Wpf.CartesianChart  -   5          Name$ QueriesChart��57   )   &    LiveCharts.Wpf.Charts.Base.Chart   LegendLocation$ Right=�6U   
�������$��	0,10,0,-3q�6      Series 59      !   LiveCharts.Wpf.ColumnSeries     LiveCharts.Wpf.Series   Title$ Total Queries��6/      Fill �#2196F3	   Values	 6E   �� *TotalQueries+6e     5:      $ Queries Blocked��6/    �#FF5722	 6G   �� *BlockedQueries+6i     5;      $ Percentage Blocked��6/    �#FFC107	 6J   �� *PercentageBlocked+6o     5<      $ Domains on Adlists��6/    �#4CAF50	 6J   �� *DomainsOnAdlists+6n   
   AxisX
 5?         LiveCharts.Wpf.Axis     Title$
 Time��6'       LiveCharts.Wpf.DefaultAxes   CleanSeparator   	Separator# Z 6w      
Foreground
 �����   LabelFormatter 64   �� *TimeFormatter+   Labels 6]   �� *Labels+6�   5A      5B      5C      5D      5E      5F      