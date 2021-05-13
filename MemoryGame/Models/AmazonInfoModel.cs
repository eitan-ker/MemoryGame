using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson.Serialization.Attributes;

namespace MemoryGame.Models
{
    public class AmazonInfoModel
    {
        [BsonElement("worker_id")]
        public string WorkerId { get; set; }

        [BsonElement("ass_id")]
        public string AssId { get; set; }

        [BsonElement("hit_id")]
        public string HitId { get; set; }
    }
}