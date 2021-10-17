using System.Text.Json.Serialization;

namespace MemoryGame.Models.EndGameModels
{
    public class RealAnsOfTimeModel
    {
        [JsonPropertyName("AnsBob")]
        public string AnsBob { get; set; }

        [JsonPropertyName("AnsPlayer")]
        public string AnsPlayer { get; set; }
    }
}