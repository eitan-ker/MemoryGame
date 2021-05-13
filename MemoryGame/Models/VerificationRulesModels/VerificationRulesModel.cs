using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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