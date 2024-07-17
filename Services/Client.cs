using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Garage.Services
{
    public class Client
    {
        public int Id { get; set; }
        public string Ip { get; set; }
        public long DateAdded { get; set; }
        public long DateModified { get; set; }
        public string Comment { get; set; }
        public string Groups { get; set; }
    }

}
