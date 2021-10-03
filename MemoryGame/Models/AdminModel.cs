using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models
{
    public class AdminModel
    {
        [JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }
        
        [JsonProperty(PropertyName = "Password")]
        public string Password { get; set; }
        
    }
}