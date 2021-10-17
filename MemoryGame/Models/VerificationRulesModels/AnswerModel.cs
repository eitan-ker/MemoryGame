using Newtonsoft.Json;

namespace MemoryGame.Models.VerificationRulesModels
{
    public class AnswerModel
    {
        [JsonProperty(PropertyName = "index")]
        public int index { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string text { get; set; }
        
        [JsonProperty(PropertyName = "correct")]
        public bool correct { get; set; }
    }
}