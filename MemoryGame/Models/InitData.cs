using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace MemoryGame.Models
{
    public class InitData
    {
        [JsonProperty(PropertyName = "overallTime")]
        public long OverallTime { get; set; }

        [JsonProperty(PropertyName = "personalTime")]
        public long PersonalTime { get; set; }

        [JsonProperty(PropertyName = "numOfCards")]
        public List<int> NumOfCards { get; set; }
        
        [JsonProperty(PropertyName = "numOfAgents")]
        public int NumOfAgents { get; set; }
        
        [JsonProperty(PropertyName = "typeOfAgent")]
        public List<string> typeOfAgent { get; set; }
        
        [JsonProperty(PropertyName = "hintConfig")]
        public int HintConfig { get; set; }
    }
}
/*
overallTime= "",// times in milliseconds
personalTime: 3000,
numOfCards: 2,
numOfAgents: 4*/