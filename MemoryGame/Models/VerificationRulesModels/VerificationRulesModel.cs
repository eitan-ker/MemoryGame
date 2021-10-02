using Newtonsoft.Json;
using System.Collections.Generic;


namespace MemoryGame.Models.VerificationRulesModels
{
    /*public class VerificationRulesModel
    {
        [JsonProperty(PropertyName = "NumOfTries")]
        public int NumOfTries { get; set; }
        
        [JsonProperty(PropertyName = "AttempsInfo")]
        public List<List<int>> AttempsInfo { get; set; }

        [JsonProperty(PropertyName = "Questions")]
        public List<QuestionModel> Questions { get; set; }
    }*/
    
    public class Answer
    {
        public string text { get; set; }
        public bool correct { get; set; }
        public int index { get; set; }
    }

    public class Question
    {
        public string question { get; set; }
        public List<Answer> answers { get; set; }
    }

    public class VerificationRulesModel
    {
        public List<Question> Questions { get; set; }
        public List<List<int>> AttempsInfo { get; set; }
        public int NumOfTries { get; set; }
    }

}