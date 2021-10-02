using Newtonsoft.Json;
using System.Collections.Generic;


namespace MemoryGame.Models.VerificationRulesModels
{
    public class QuestionModel
    {
        [JsonProperty(PropertyName = "question")]
        public string question { get; set; }

        [JsonProperty(PropertyName = "answers")]
        public List<AnswerModel> answers { get; set; }
    }
}