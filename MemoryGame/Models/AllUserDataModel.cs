using System.Collections.Generic;
using MemoryGame.Models.EndGameModels;
using MemoryGame.Models.VerificationRulesModels;
using MemoryGame.Models.FeedBackModels;
using MemoryGame.Models.Game;

namespace MemoryGame.Models
{
    public class AllUserDataModel
    {
        public AmazonInfoModel _amazonInfoModel;
        public GameModel _gameModel;
        public List<TimeInPageModel> _timeInPageModels;
        public VerificationRulesModel _verificationRulesModels;
        public PersonalDetails _personalDetails;
        public FeedBackModel _feedBackModels;
        public EndGameModel _endGameModel;
        public InitData _initData;


    }
}