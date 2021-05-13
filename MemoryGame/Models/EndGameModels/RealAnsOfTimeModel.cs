using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Web;

namespace MemoryGame.Models.EndGameModels
{
    public class RealAnsOfTimeModel
    {
        [JsonPropertyName("AnsBob")]
        public string AnsBob { get; set; }

        [JsonPropertyName("AnsPlayer")]
        public string AnsPlayer { get; set; }
    }
}