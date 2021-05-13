using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MemoryGame.Models.VerificationRulesModels
{
    public class QuestionModel
    {
        [JsonProperty(PropertyName = "question")]
        public string Question { get; set; }

        [JsonProperty(PropertyName = "answers")]
        public List<AnswerModel> Answers { get; set; }
    }
}