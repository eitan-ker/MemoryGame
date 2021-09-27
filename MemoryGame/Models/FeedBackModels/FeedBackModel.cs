using Newtonsoft.Json;
using System.Collections.Generic;


namespace MemoryGame.Models.FeedBackModels
{
    public class FeedBackModel
    {
        [JsonProperty("Questions")]
        public List<string> Questions { get; set; }

        [JsonProperty("Answers")]
        public List<List<string>> Answers { get; set; }
    }
}