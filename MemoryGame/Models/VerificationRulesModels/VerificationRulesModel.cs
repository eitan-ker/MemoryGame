using Newtonsoft.Json;
using System.Collections.Generic;


namespace MemoryGame.Models.VerificationRulesModels
{
    public class VerificationRulesModel
    {
        [JsonProperty(PropertyName = "NumOfTries")]
        public int NumOfTries { get; set; }
        
        [JsonProperty(PropertyName = "AttempsInfo")]
        public List<List<int>> Answers { get; set; }

        [JsonProperty(PropertyName = "Questions")]
        public List<QuestionModel> Questions { get; set; }
    }
}