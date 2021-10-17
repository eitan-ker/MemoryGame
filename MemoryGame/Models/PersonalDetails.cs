using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models
{
    public class PersonalDetails
    {
        [JsonProperty(PropertyName = "questions")]
        public List<string> Questions { get; set; }
        [JsonProperty(PropertyName = "ArrayOfAnswers")]
        public List<List<string>> ArrayOfAnswers { get; set; }
        [JsonProperty(PropertyName = "tries")]
        public int Tries { get; set; }
        [JsonProperty(PropertyName = "success")]
        public bool Success { get; set; }
        
    }
}