   M S B A M L   `   `   `  ���� 
  Garage    Garage.SettingsPage   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006       � 	Resources     PrimaryColor �� Color  SecondaryColor  	TextColor  BackgroundColor  	CardColor  HighlightColor  PanelBackgroundColor  BorderColor  HeaderStyle �� 
TargetType �� Property �� Value 	 
LabelStyle 
 TextBoxStyle  PasswordBoxStyle  ComboBoxStyle  ComboBoxItemStyle  ButtonStyle  GroupBoxStyle  CheckBoxStyle  RadioButtonStyle��%�  &	        &	      &	 &     &	 9     &	 L     &	 _     &	 r     &	 �     &	 �     7  &		 �     7  &	
 -    7  &	 �    7  &	 '    7  &	 �    7  &	 �    7  &	 �    7  7  &	 N    7  &	 �    7  �� $ #4CAF50���� $ #2196F3���� $ #FFFFFF���� $ #1E1E1E���� $ #2B2B2B���� $ #FF5722���� $ #2E3338���� $ #CCCCCC���� " ��.���  � ��$ 20(���  � ��8   ��  � ��$ 10q��� " ��.���  � ��$ 16(���  � ��8   ��  � ��$ 5q��� " ��.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000�� " G�.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000�� " ��.���  � ��$	 200����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#000000��  � �� �#FFFFFF�� " ��.���  � ��8   ��  � �� �#000000�� " ��.���  � ��$	 100����  � ��$ 30����  � ��$ 5q���  � ��8   ��  � �� �#FF5722��  � �� �#FF5722��  � ��$
 Bold"��� " ��.���  � ��$ 0,0,0,20q���  � ��8   ��  �@��Padding$ 10q���  � ��8  ��  � ��$ 1q���  �@��CornerRadius$ 5���� " ��.���  � ��8   ��  � ��$ 5q��� " 	�.���  � ��8   ��  � ��$ 5q�.��� #��[  � ColumnDefinitions �� $	��61* ��� $
��339* �.+��� #��[ $��
0,0,0,-850q�$��2��.@��� $��System��.���� $
��Auto=�.���� $��20q�.+��� #��[ ._��� .+��� $��FTL Information��#��[ � $��10q� � RowDefinitions �� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto � �� $��* ��� $��* �.+��� $��FTL version:��#��[	 $��0��$��0���� $��v5.25.2��#��[	 $��0��$��1���� $��Process identifier (PID):��#��[	 $��1��$��0���� $
��7016��#��[	 $��1��$��1���� $��Time FTL started:��#��[	 $��2��$��0���� $!��Mon Aug 5 13:09:47 2024 UTC��#��[	 $��2��$��1���� $��User / Group:��#��[	 $��3��$��0���� $��pihole / pihole��#��[	 $��3��$��1���� $��Total CPU utilization:��#��[	 $��4��$��0���� $
��0.0%��#��[	 $��4��$��1���� $��Memory utilization:��#��[	 $��5��$��0���� $
��0.1%��#��[	 $��5��$��1���� $��Used memory:��#��[	 $��6��$��0���� $��6.78 MB��#��[	 $��6��$��1���� $��DNS cache size:��#��[	 $��7��$��0���� $��10000��#��[	 $��7��$��1���� $��DNS cache insertions:��#��[	 $��8��$��0���� $��0��#��[	 $��8��$��1���� $��DNS cache evictions:��#��[	 $��9��$��0���� $��0��#��[	 $��9��$��1���� -   $��Disable Query Logging��#��[ $��Center=�$��Center=��� $	��DNS��.���� $
��Auto=�$��2,0,-2,0q�.���� $��20q�.+��� #��[ ._��� .+��� $��Advanced DNS settings��#��[ �� -    ��Name$ DnsFqdnRequiredCheckBox��$/��)Never forward non-FQDN A and AAAA queries��#��[  d� 	IsChecked$
 TrueY��� $����When there is a Pi-hole domain set and this box is ticked, this asks FTL that this domain is purely local and FTL may answer queries from /etc/hosts lub DHCP leases but should never forward queries on that domain to any upstream servers. If Conditional Forwarding is enabled, unticking this box may cause a partial DNS loop under certain circumstances (e.g. if a client would send TLD DNSSEC queries).��#��[	 $
��Wrap=��� -   $ DnsBogusPrivCheckBox��$9��3Never forward reverse lookups for private IP ranges��#��[ $
 TrueY��� $����All reverse lookups for private IP ranges (i.e., 192.168.0.x/24, etc.) which are not found in /etc/hosts lub the DHCP leases are answered with 'no such domain' rather than being forwarded upstream. The set of prefixes affected is the list given in RFC6303.��#��[	 $
��Wrap=��� -   $ DnssecCheckBox��$��
Use DNSSEC��#��[ �� $����Validate DNS replies and cache DNSSEC data. When forwarding DNS queries, Pi-hole requests the DNSSEC records needed to validate the replies. If a domain fails validation or the upstream does not support DNSSEC, this setting can cause issues resolving domains. Use an upstream DNS server which supports DNSSEC when activating DNSSEC. Note that the size of your log might increase significantly when enabling DNSSEC. A DNSSEC resolver test can be found here.��#��[	 $
��Wrap=��� #��[ ._��� .+��� $��Rate-limiting��#��[ �� 	 �� Orientation$	 
Horizontal=�.+��� $$��Block clients making more than��#��[	 $��Center=��� -   
 ��Name$ 
 RateLimitQueryCountTextBox��$
��2137��#��[
 $��50���� $��queries within��#��[	 $��Center=��� -   $
 RateLimitSecondsTextBox��$��69��#��[
 $��50���� $��seconds.��#��[	 $��Center=��� $����When a client makes too many queries in too short time, it gets rate-limited. Rate-limited queries are answered with a REFUSED reply and not further processed by FTL and prevent Pi-holes getting overwhelmed by rogue clients. It is important to note that rate-limiting is happening on a per-client basis. Other clients can continue to use FTL while rate-limited clients are short-circuited at the same time.��#��[	 $
��Wrap=��� $y��sRate-limiting may be disabled altogether by setting both values to zero. See our documentation for further details.��#��[	 $
��Wrap=��� -   $��Apply��#��[ �� #��[ $	��662��._��� .+��� $��Conditional forwarding��#��[ �� -   $# ConditionalForwardingCheckBox��$ ��Use Conditional Forwarding��#��[ �� $����If not configured as your DHCP server, Pi-hole typically won't be able to determine the names of devices on your local network. As a result, tables such as Top Clients will only show IP addresses.��#��[	 $
��Wrap=��� $����One solution for this is to configure Pi-hole to forward these requests to your DHCP server (most likely your router), but only for devices on your home network. To configure this we will need to know the IP address of your DHCP server and which addresses belong to your local network. Exemplary input is given below as placeholder in the text boxes (if empty).��#��[	 $
��Wrap=��� $����If your local network spans 192.168.0.1 - 192.168.0.255, then you will have to input 192.168.0.0/24. If your local network is 192.168.47.1 - 192.168.47.255, it will be 192.168.47.0/24 and similar. If your network is larger, the CIDR has to be different, for instance a range of 10.8.0.1 - 10.8.255.255 results in 10.8.0.0/16, whereas an even wider network of 10.0.0.1 - 10.255.255.255 results in 10.0.0.0/8. Setting up IPv6 ranges is exactly similar to setting up IPv4 here and fully supported. Feel free to reach out to us on our Discourse forum in case you need any assistance setting up local host name resolution for your particular system.��#��[	 $
��Wrap=��� $����You can also specify a local domain name (like fritz.box) to ensure queries to devices ending in your local domain name will not leave your network, however, this is optional. The local domain name must match the domain name specified in your DHCP server for this to work. You can likely find it within the DHCP settings.��#��[	 $
��Wrap=��� $����Enabling Conditional Forwarding will also forward all hostnames (i.e., non-FQDNs) to the router when 'Never forward non-FQDNs' is not enabled.��#��[	 $
��Wrap=�� $��10q� �� $��* ��� $��* ��� $��* �.+��� $$��Local network in CIDR notation��#��[	 $��0���� $-��'IP address of your DHCP server (router)��#��[	 $��1���� $"��Local domain name (optional)��#��[	 $��2���� -	   $
 LocalNetworkCidrTextBox��$��192.168.0.0/16��#��[
 $��0���� -
   $
 DhcpServerIpTextBox��$��192.168.0.1��#��[
 $��1���� -   $
 LocalDomainNameTextBox��$��local��#��[
 $��2���� -   $��Apply��#��[ �� $��	Interface��.���� $
��Auto=�.���� $��20q�.+��� #��[ ._��� .+��� $��Theme and Layout��#��[ 	� $,��&Pi-hole default theme (light, default)�� 	� 	GroupName$ Theme��#��[ 	� $#��Pi-hole midnight theme (dark)��$ Theme��#��[ 	� $(��"Pi-hole deep-midnight theme (dark)��$ Theme��#��[ 	� $��High contrast light��$ Theme��#��[ 	� $��High contrast dark��$ Theme��#��[ 	� $%��Pi-hole auto theme (light/dark)��$ Theme��#��[ $
 TrueY�	� $"��Star Trek LCARS theme (dark)��$ Theme��#��[ 	� $)��#Star Trek Picard LCARS theme (dark)��$ Theme��#��[ �� $*��$Use boxed layout (for large screens)��#��[ $
 TrueY��� $
��Save��#��[ $��Right=��� #��[ ._��� .+��� $%��Interface settings (auto saved)��#��[ �� $��10q�.+��� $��Global Settings��$
��Bold"�#��[	 �� $	 
Horizontal=�$��Center=�.+��� $��CPU Temperature Unit:��#��[	 $��Center=��� -    ��Name$  CpuTemperatureUnitComboBox��#��[ .@��� $��Celsius��#��[  �� 
IsSelected$
 True���� $��
Fahrenheit��#��[ �� $��10q�.+��� $��Per Browser Settings��$
��Bold"�#��[	 �� $	 
Horizontal=�$��Center=�.+��� $!��Checkbox and radio buttons:��#��[	 $��Center=��� -   $" CheckboxRadioButtonsComboBox��#��[ .@��� $��primary��#��[ $
 True���� $��	secondary��#��[ �� $��default��#��[ �� $��warning��#��[ �� $��danger��#��[ �� -   $ UseNewBarChartsCheckBox��$%��Use new Bar charts on dashboard��#��[ $
 TrueY��� -   $ ColorfulQueryLogCheckBox��$��Colorful Query Log��#��[ �� -   $" HideNonFatalWarningsCheckBox��$<��6Hide non-fatal dnsmasq warnings (warnings listed here)��#��[ �� $��Privacy��.���� $
��Auto=�.���� $��20q�.+��� #��[ ._��� .+��� $��Privacy settings��#��[ �� $ ��DNS resolver privacy level��#��[ $��0,10,0,0q��� $I��CSpecify if DNS queries should be anonymized, available options are:��#��[	 $
��Wrap=�	� -    	�Name$ ShowEverythingRadioButton��$+��%Show everything and record everything��$ PrivacyLevel��#��[ $
 TrueY��� $(��"Gives maximum amount of statistics��#��[	 $
��Wrap=�	� -   $ HideDomainsRadioButton��$=��7Hide domains: Display and store all domains as 'hidden'��$ PrivacyLevel��#��[ �� $]��WThis disables the Top Permitted Domains and Top Blocked Domains tables on the dashboard��#��[	 $
��Wrap=�	� -   $&  HideDomainsAndClientsRadioButton��$f��`Hide domains and clients: Display and store all domains as 'hidden' and all clients as '0.0.0.0'��$ PrivacyLevel��#��[ �� $/��)This disables all tables on the dashboard��#��[	 $
��Wrap=�	� -   $ AnonymousModeRadioButton��$]��WAnonymous mode: This disables basically everything except the live anonymous statistics��$ PrivacyLevel��#��[ �� ${��uNo history is saved at all to the database, and nothing is shown in the query log. Also, there are no top item lists.��#��[	 $
��Wrap=��� $����The privacy level may be increased at any time without having to restart the DNS resolver. However, note that the DNS resolver needs to be restarted when lowering the privacy level. This restarting is automatically done when saving.��#��[	 $
��Wrap=��� -   $��Apply��#��[ $��Right=�