using System.Collections.Generic;
using MemoryGame.Models.EndGameModels;
using MemoryGame.Models.VerificationRulesModels;
using MemoryGame.Models.FeedBackModels;

namespace MemoryGame.Models
{
    public class AllUserDataModel
    {
        public AmazonInfoModel _amazonInfoModel;
        public List<TimeInPageModel> _timeInPageModels;
        public VerificationRulesModel _verificationRulesModels;
        public PersonalDetails _personalDetails;
        public FeedBackModel _feedBackModels;
        public EndGameModel _endGameModel;
        

    }
}