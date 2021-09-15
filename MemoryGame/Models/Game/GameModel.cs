using System.Collections.Generic;
using MemoryGame.Models.Game.Objects;
using Newtonsoft.Json;

namespace MemoryGame.Models.Game
{
    public class GameModel
    {
        [JsonProperty(PropertyName = "initBoard")]
        public List<List<Card>> InitBoard { get; set; }
        
        [JsonProperty(PropertyName = "turnInfo")]
        public List<Turn> TurnInfo { get; set; }
        
        [JsonProperty(PropertyName = "agents")]
        public List<Agent> Agents { get; set; }
        
        [JsonProperty(PropertyName = "numberOfTurns")]
        public int NumberOfTurns { get; set; }
        
        [JsonProperty(PropertyName = "configuration")]
        public InitData Configuration { get; set; }
        
        [JsonProperty(PropertyName = "scores")]
        public List<int> Scores { get; set; }
        
        [JsonProperty(PropertyName = "startTime")]
        public string StartTime { get; set; }
        
        [JsonProperty(PropertyName = "endTime")]
        public string EndTime { get; set; }
        
        [JsonProperty(PropertyName = "hintArr")]
        public HintInfo HintArr { get; set; }
    }
}