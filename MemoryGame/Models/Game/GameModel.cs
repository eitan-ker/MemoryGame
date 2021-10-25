using System.Collections.Generic;
using Newtonsoft.Json;

namespace MemoryGame.Models.Game
{
    /*public class GameModel
    {
        public List<List<>> initBoard { get; set; }
        public List<TurnInfo> turnInfo { get; set; }
        public List<Agent> agents { get; set; }
        public int numberofTurns { get; set; }
        public Configuration configuration { get; set; }
        public List<Score> scores { get; set; }
        public List<object> hintArr { get; set; }
        public long startTime { get; set; }
        public long endTime { get; set; }
        /*[JsonProperty(PropertyName = "initBoard")]
        public List<List<Card>> InitBoard { get; set; }
        
        [JsonProperty(PropertyName = "turnInfo")]
        public List<Turn> TurnInfo { get; set; }
        
        [JsonProperty(PropertyName = "agents")]
        public List<Agent> Agents { get; set; }
        
        [JsonProperty(PropertyName = "numberOfTurns")]
        public int NumberOfTurns { get; set; }
        
        [JsonProperty(PropertyName = "configuration")]
        public InitData Configuration { get; set; }
        
        [JsonProperty(PropertyName = "scores")]
        public List<int> Scores { get; set; }
        
        [JsonProperty(PropertyName = "startTime")]
        public string StartTime { get; set; }
        
        [JsonProperty(PropertyName = "endTime")]
        public string EndTime { get; set; }
        
        [JsonProperty(PropertyName = "hintArr")]
        public HintInfo HintArr { get; set; }#1#
    }*/
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class Card
    {
        public List<int> index { get; set; }
        public string name { get; set; }
        public bool exposed { get; set; }
        public bool found { get; set; }
        public List<object> turns { get; set; }
    }

    public class ChoosenCard
    {
        public Card card { get; set; }
        public string time { get; set; }
    }

    public class FirstCard
    {
        public List<int> index { get; set; }
        public string name { get; set; }
        public bool exposed { get; set; }
        public bool found { get; set; }
        public List<object> turns { get; set; }
    }

    public class TurnInfo
    {
        public int clicks { get; set; }
        public int numOfTurn { get; set; }
        public string getTime { get; set; }
        public string agent { get; set; }
        public List<ChoosenCard> choosenCards { get; set; }
        public bool success { get; set; }
        public int scoreReward { get; set; }
        public bool usedHint { get; set; }
        public object hint { get; set; }
        public FirstCard firstCard { get; set; }
    }

    public class Agent
    {
        public string name { get; set; }
        public List<TurnInfo> turnInfo { get; set; }
        public int score { get; set; }
        public int successNumber { get; set; }
        public string type { get; set; }
    }

    public class Configuration
    {
        public int overallTime { get; set; }
        public int personalTime { get; set; }
        public List<int> numOfCards { get; set; }
        public int numOfAgents { get; set; }
        public int hintConfig { get; set; }
    }

    public class Score
    {
        public string name { get; set; }
        public int score { get; set; }
    }
    public class RegCard
    {
        public string name { get; set; }
        public List<List<int>> indices { get; set; }
    }

    public class GameModel
    {
        public List<List<RegCard>> initBoard { get; set; }
        public List<TurnInfo> turnInfo { get; set; }
        public List<Agent> agents { get; set; }
        public int numberofTurns { get; set; }
        public Configuration configuration { get; set; }
        public List<Score> scores { get; set; }
        public List<object> hintArr { get; set; }
        public long startTime { get; set; }
        public long endTime { get; set; }
    }


}