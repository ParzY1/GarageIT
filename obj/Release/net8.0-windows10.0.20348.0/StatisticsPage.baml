   M S B A M L   `   `   `  ���� U  QLiveCharts.Wpf, Version=0.9.7.0, Culture=neutral, PublicKeyToken=0bc1f845d1ebb8dfG4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.WpfLiveCharts.Wpf  
 Garage   Garage.StatisticsPage   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     Dlvc4clr-namespace:LiveCharts.Wpf;assembly=LiveCharts.Wpf     $	��669��.��� $��20q�.+�� $	��Top=�$��-3,4,0,0q�$	��174��  � ColumnDefinitions  �� $��* ��� $��* ��� $��* ��� $��* �.+��� $��0�����#2196F3 �� Padding$ 10q� �� CornerRadius$ 10��$��10q�._��� $��	15,36,0,0q�.+��� $��Total Queries��
�������$
��Bold"�$��16(��� -    ��Name$ TextBlockTotalQueries��$��0��
�������$��24(�$
��Bold"��� $��0 active clients��
�������$��12(��� $��1�����#FF5722$ 20q�$ 10��$��10q�._��� $��0,20,0,0q�.+��� $��Queries Blocked��
�������$
��Bold"�$��16(��� -   $ TextBlockBlockedQueries��$��0��
�������$��24(�$
��Bold"��� $��List blocked queries��
�������$��12(��� $��2�����#FFC107$ 20q�$ 10��$��	10,9,8,11q�._��� $��-10,23,-5,3q�.+��� $��Percentage Blocked��
�������$
��Bold"�$��16(�$��21��$	��156���� -   $  TextBlockPercentageBlocked��$��0%��
�������$��24(�$
��Bold"�$��26��$	��155��$��Center=�$	��Top=��� $��List all queries��
�������$��12(��� $��3�����#4CAF50$ 20q�$ 10��$��10q�._��� $��-9,28,-10,0q�.+��� $��Domains on Adlists��
�������$
��Bold"�$��16(��� -   $ TextBlockDomainsOnAdlists��$��0��
�������$��24(�$
��Bold"��� $��Manage adlists��
�������$��12(��� ���#2D2D2D$ 20q�$ 10��$��10,205,10,5q�._��� .+��� $&�� Total queries over last 24 hours��
�������$
��Bold"�$��18(�$��0,0,0,10q��� ���#1D1D1D$ 10q�$ 5��$	��340��._�#   LiveCharts.Wpf.CartesianChart  -     Name$ QueriesChart��&    LiveCharts.Wpf.Charts.Base.Chart   LegendLocation$ Right=�
�������$��	0,10,0,-3q�   Series !   LiveCharts.Wpf.ColumnSeries     LiveCharts.Wpf.Series   Title$ Total Queries��   Fill �#2196F3	   Values	 �� *TotalQueries+  $ Queries Blocked�� �#FF5722	 �� *BlockedQueries+  $ Percentage Blocked�� �#FFC107	 �� *PercentageBlocked+  $ Domains on Adlists�� �#4CAF50	 �� *DomainsOnAdlists+
   AxisX
    LiveCharts.Wpf.Axis     Title$
 Time��    LiveCharts.Wpf.DefaultAxes   CleanSeparator   	Separator# Z    
Foreground
 �����   LabelFormatter �� *TimeFormatter+   Labels �� *Labels+