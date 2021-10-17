using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace MemoryGame.Models.EndGameModels
{
    public class EndGameModel
    {
        [JsonPropertyName("mistakes")]
        public int Mistakes { get; set; }

        [JsonPropertyName("player_time")]
        public string player_time { get; set; }

        [JsonPropertyName("bob_time")]
        public string bob_time { get; set; }

        [JsonPropertyName("MistakesInfo")]
        public List<RealAnsOfTimeModel> MistakesInfo { get; set; }
    }
}