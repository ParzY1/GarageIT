using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Garage.Models
{
    public class Domain
    {
        public int Id { get; set; }
        public int Type { get; set; }
        [JsonProperty("Domain")] // Ensure this matches the JSON property
        public string DomainName { get; set; }
        public int Enabled { get; set; }
        public long DateAdded { get; set; }
        public long DateModified { get; set; }
        public string Comment { get; set; }
        public List<int> Groups { get; set; }

        [JsonIgnore]
        public bool IsSelected { get; set; }

        [JsonIgnore]
        public string GroupsString { get; set; }
    }
}
