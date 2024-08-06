﻿#pragma checksum "..\..\..\DomainsPage.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9EB44DDB3F94FEACEB6A310E9602B63C3E8EB1EC"
//------------------------------------------------------------------------------
// <auto-generated>
//     Ten kod został wygenerowany przez narzędzie.
//     Wersja wykonawcza:4.0.30319.42000
//
//     Zmiany w tym pliku mogą spowodować nieprawidłowe zachowanie i zostaną utracone, jeśli
//     kod zostanie ponownie wygenerowany.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace Garage {
    
    
    /// <summary>
    /// DomainsPage
    /// </summary>
    public partial class DomainsPage : System.Windows.Controls.UserControl, System.Windows.Markup.IComponentConnector, System.Windows.Markup.IStyleConnector {
        
        
        #line 244 "..\..\..\DomainsPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox domainTextBox;
        
        #line default
        #line hidden
        
        
        #line 246 "..\..\..\DomainsPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox commentTextBox;
        
        #line default
        #line hidden
        
        
        #line 247 "..\..\..\DomainsPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.ComboBox listComboBox;
        
        #line default
        #line hidden
        
        
        #line 255 "..\..\..\DomainsPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox groupTextBox;
        
        #line default
        #line hidden
        
        
        #line 269 "..\..\..\DomainsPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.DataGrid whitelistDataGrid;
        
        #line default
        #line hidden
        
        
        #line 297 "..\..\..\DomainsPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.DataGrid blacklistDataGrid;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "8.0.6.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/Garage;V1.0.0.0;component/domainspage.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\DomainsPage.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "8.0.6.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            
            #line 8 "..\..\..\DomainsPage.xaml"
            ((Garage.DomainsPage)(target)).Loaded += new System.Windows.RoutedEventHandler(this.DomainsPage_Loaded);
            
            #line default
            #line hidden
            return;
            case 2:
            this.domainTextBox = ((System.Windows.Controls.TextBox)(target));
            return;
            case 3:
            this.commentTextBox = ((System.Windows.Controls.TextBox)(target));
            return;
            case 4:
            this.listComboBox = ((System.Windows.Controls.ComboBox)(target));
            return;
            case 5:
            
            #line 251 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.AddToDomains_Click);
            
            #line default
            #line hidden
            return;
            case 6:
            this.groupTextBox = ((System.Windows.Controls.TextBox)(target));
            return;
            case 7:
            
            #line 256 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.AddSelectedDomainsToGroup_Click);
            
            #line default
            #line hidden
            return;
            case 8:
            
            #line 257 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.RemoveSelectedDomainsFromGroup_Click);
            
            #line default
            #line hidden
            return;
            case 9:
            this.whitelistDataGrid = ((System.Windows.Controls.DataGrid)(target));
            return;
            case 12:
            this.blacklistDataGrid = ((System.Windows.Controls.DataGrid)(target));
            return;
            }
            this._contentLoaded = true;
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "8.0.6.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        void System.Windows.Markup.IStyleConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 10:
            
            #line 282 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.RemoveFromWhitelist_Click);
            
            #line default
            #line hidden
            break;
            case 11:
            
            #line 283 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.AddToBlacklist_Click);
            
            #line default
            #line hidden
            break;
            case 13:
            
            #line 310 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.RemoveFromBlacklist_Click);
            
            #line default
            #line hidden
            break;
            case 14:
            
            #line 311 "..\..\..\DomainsPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.AddToWhitelist_Click);
            
            #line default
            #line hidden
            break;
            }
        }
    }
}

