using Newtonsoft.Json;
using System.Collections.Generic;


namespace MemoryGame.Models.FeedBackModels
{
    public class FeedBackModel
    {
        [JsonProperty("questions")]
        public List<string> Questions { get; set; }

        [JsonProperty("answers")]
        public List<List<string>> Answers { get; set; }
    }
}