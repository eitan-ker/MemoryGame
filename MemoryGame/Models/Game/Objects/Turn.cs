using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models.Game.Objects
{
    public class Turn
    {
        [JsonProperty(PropertyName = "time")]
        public string Time { get; set; }
        
        [JsonProperty(PropertyName = "numOfTurn")]
        public int NumOfTurn { get; set; }
        
        [JsonProperty(PropertyName = "whoPlayed")]
        public string WhoPlayed { get; set; }
        
        [JsonProperty(PropertyName = "isSuccess")]
        public bool IsSuccess { get; set; }
        
        [JsonProperty(PropertyName = "scoreReward")]
        public int ScoreReward { get; set; }
        
        [JsonProperty(PropertyName = "hint")]
        public bool Hint { get; set; }
        
        [JsonProperty(PropertyName = "choosenCard")]
        public CardAndTime ChoosenCard { get; set; }
        
    }
}