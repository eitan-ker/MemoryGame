using System.Collections.Generic;
using MemoryGame.Models.EndGameModels;
using MemoryGame.Models.VerificationRulesModels;
using MemoryGame.Models.FeedBackModels;
using MemoryGame.Models.Game;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MemoryGame.Models
{
    public class AllUserDataModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public AmazonInfoModel _amazonInfoModel;
        public GameModel _gameModel;
        public List<TimeInPageModel> _timeInPageModels;
        public VerificationRulesModel _verificationRulesModels;
        public PersonalDetails _personalDetails;
        public FeedBackModel _feedBackModels;
        public EndGameModel _endGameModel;
        public InitData _initData;
        public bool _isClientFinishedGame;


    }
}