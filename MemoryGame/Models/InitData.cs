using MongoDB.Bson.Serialization.Attributes;

namespace MemoryGame.Models
{
    public class InitData
    {
        [BsonElement("overall_time")]
        public string overallTime { get; set; }

        [BsonElement("personal_time")]
        public string personalTime { get; set; }

        [BsonElement("numOfCards")]
        public string numOfCards { get; set; }
        
        [BsonElement("numOfAgents")]
        public string numOfAgents { get; set; }
    }
}
/*
overallTime= "",// times in milliseconds
personalTime: 3000,
numOfCards: 2,
numOfAgents: 4*/