using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Garage.Models
{
    public class Group
    {
        public int Id { get; set; }
        public int Enabled { get; set; }
        public string Name { get; set; }
        public long DateAdded { get; set; }
        public long DateModified { get; set; }
        public string Description { get; set; }
        public string Status { get; set; } // This property is for display purposes
    }
}

