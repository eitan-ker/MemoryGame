using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MemoryGame.Models.VerificationRulesModels
{
    public class AnswerModel
    {
        [JsonProperty(PropertyName = "index")]
        public int Index { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "correct")]
        public bool Correct { get; set; }
    }
}