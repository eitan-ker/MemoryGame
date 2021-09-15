using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models.Game.Objects
{
    public class Agent
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        [JsonProperty(PropertyName = "turnInfo")]
        public List<Turn> TurnInfo { get; set; }
        
        [JsonProperty(PropertyName = "successNumber")]
        public int SuccessNumber { get; set; }
        
        [JsonProperty(PropertyName = "score")]
        public int Score { get; set; }
    }
}