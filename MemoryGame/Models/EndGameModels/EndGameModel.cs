using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace MemoryGame.Models.EndGameModels
{
    public class EndGameModel
    {
        [JsonPropertyName("NumOfTries")]
        public int NumOfTries { get; set; }

        [JsonPropertyName("PlayerTime")]
        public string PlayerTime { get; set; }

        [JsonPropertyName("BobTime")]
        public string BobTime { get; set; }

        [JsonPropertyName("ArrAns")]
        public List<RealAnsOfTimeModel> ArrAns { get; set; }
    }
}