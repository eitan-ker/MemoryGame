using System.Collections.Generic;
using Newtonsoft.Json;


namespace MemoryGame.Models.Game.Objects
{
    public class Card
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        [JsonProperty(PropertyName = "indices")]
        public List<int> Indices { get; set; }

        
    }
}