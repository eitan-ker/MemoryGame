using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.Json.Serialization;

namespace MemoryGame.Models
{
    public class TimeInPageModel
    {
        [JsonPropertyName("beginTime")]
        public string BeginTime { get; set; }
        [JsonPropertyName("endTime")]
        public string EndTime { get; set; }
        [JsonPropertyName("nameOfPage")]
        public string NameOfPage { get; set; }
    }
}