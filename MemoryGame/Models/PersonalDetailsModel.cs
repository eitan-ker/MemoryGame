using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MemoryGame.Models
{
    public class PersonalDetailsModel
    {
        [JsonProperty(PropertyName = "Questions")]
        public List<string> Questions { get; set; }
        [JsonProperty(PropertyName = "Answers")]
        public List<List<string>> Answers { get; set; }
        [JsonProperty(PropertyName = "NumOfTries")]
        public int NumOfTries { get; set; }
        [JsonProperty(PropertyName = "IsSuccess")]
        public bool IsSuccess { get; set; }
    }
}