using MongoDB.Bson.Serialization.Attributes;

namespace MemoryGame.Models
{
    public class InitData
    {
        [BsonElement("overall_time")]
        public string overallTime { get; set; }

        [BsonElement("personal_time")]
        public string personalTime { get; set; }

        [BsonElement("num_of_cards")]
        public string numOfCards { get; set; }
        
        [BsonElement("num_of_agents")]
        public string numOfAgents { get; set; }
    }
}
/*
overallTime= "",// times in milliseconds
personalTime: 3000,
numOfCards: 2,
numOfAgents: 4*/