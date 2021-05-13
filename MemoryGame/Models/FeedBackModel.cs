using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MemoryGame.Models
{
    public class FeedBackModel
    {
        [JsonProperty("questions")]
        public List<string> Questions { get; set; }

        [JsonProperty("answers")]
        public List<List<string>> Answers { get; set; }
    }
}