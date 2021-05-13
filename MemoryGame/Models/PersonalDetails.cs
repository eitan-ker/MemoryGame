using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models
{
    public class PersonalDetails
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