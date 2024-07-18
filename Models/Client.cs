using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Garage.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Ip { get; set; }
        public string DateAdded { get; set; }
        public string DateModified { get; set; }
        public string Comment { get; set; }
        public string Groups { get; set; }
        public int Enabled { get; set; } // Assuming Enabled is of type int
        public string Status { get; set; } // This property is for display purposes
    }
}

