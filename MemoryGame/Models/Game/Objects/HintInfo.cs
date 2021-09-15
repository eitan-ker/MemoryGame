using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models.Game.Objects
{
    public class HintInfo
    {
        [JsonProperty(PropertyName = "hintCard")]
        public Card HintCard { get; set; }
        
        [JsonProperty(PropertyName = "hintType")]
        public int HintType { get; set; }
        
        [JsonProperty(PropertyName = "time")]
        public string Time { get; set; }
    }
}