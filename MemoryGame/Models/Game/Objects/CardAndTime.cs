using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models.Game.Objects
{
    public class CardAndTime
    {
        [JsonProperty(PropertyName = "time")]
        public string Time { get; set; }
        
        [JsonProperty(PropertyName = "indices")]
        public List<int> Indices { get; set; }
        
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}