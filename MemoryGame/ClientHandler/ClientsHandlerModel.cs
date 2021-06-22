using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MemoryGame.Models;
using MemoryGame.Models.EndGameModels;
using MemoryGame.Models.FeedBackModels;
using MemoryGame.Models.VerificationRulesModels;

namespace MemoryGame.ClientHandler
{
    public class ClientsHandlerModel
    {
        private static Mutex mtx = new Mutex();
        private static bool isDoneDownloading = false;
        private static IDictionary<string, AllUserDataModel> dictOfUsers = new Dictionary<string, AllUserDataModel>();
        
        #region userinfo
        public static int AddNewUser(AmazonInfoModel amazonInfoModel)
        {
            AllUserDataModel userModel = new AllUserDataModel();
            userModel._amazonInfoModel = amazonInfoModel;
            mtx.WaitOne();
            dictOfUsers[amazonInfoModel.WorkerId] = userModel;
            mtx.ReleaseMutex();
            return 1;
        }
        
        public static int AddTimeModel(AmazonInfoModel amazonInfoModel, TimeInPageModel timeInPageModel)
        {
            if (!CheckIfUserExist(amazonInfoModel))
            {
                return 0;
            }

            string workerId = amazonInfoModel.WorkerId;
            mtx.WaitOne();

            if (dictOfUsers[workerId]._timeInPageModels == null)
            {
                List<TimeInPageModel> listTimeInPageModels = new List<TimeInPageModel>();
                listTimeInPageModels.Add(timeInPageModel);
                dictOfUsers[workerId]._timeInPageModels = listTimeInPageModels;
            }
            else
            {
                dictOfUsers[workerId]._timeInPageModels.Add(timeInPageModel);
            }
            mtx.ReleaseMutex();
            return 1;
        }

        public static int AddVerificationRulesModel(AmazonInfoModel amazonInfoModel, VerificationRulesModel verificationRulesModel)
        {
            if (!CheckIfUserExist(amazonInfoModel))
            {
                return 0;
            }

            mtx.WaitOne();
            string workerId = amazonInfoModel.WorkerId;
            dictOfUsers[workerId]._verificationRulesModels = verificationRulesModel;
            mtx.ReleaseMutex();
            return 1;
        }
        
        public static int AddFeedBackModel(AmazonInfoModel amazonInfoModel, FeedBackModel feedBackModel)
        {
            if (!CheckIfUserExist(amazonInfoModel))
            {
                return 0;
            }

            string workerId = amazonInfoModel.WorkerId;
            mtx.WaitOne();
            dictOfUsers[workerId]._feedBackModels = feedBackModel;
            mtx.ReleaseMutex();
            return 1;
        }

        public static int AddPersonalDetailsModel(AmazonInfoModel amazonInfoModel, PersonalDetails personalDetailsModel)
        {
            if (!CheckIfUserExist(amazonInfoModel))
            {
                return 0;
            }

            string workerId = amazonInfoModel.WorkerId;
            mtx.WaitOne();
            dictOfUsers[workerId]._personalDetails = personalDetailsModel;
            mtx.ReleaseMutex();
            return 1;
        }

        public static int AddEndGameModel(AmazonInfoModel amazonInfoModel, EndGameModel endGameModel)
        {
            if (!CheckIfUserExist(amazonInfoModel))
            {
                return 0;
            }

            string workerId = amazonInfoModel.WorkerId;
            mtx.WaitOne();
            dictOfUsers[workerId]._endGameModel = endGameModel;
            mtx.ReleaseMutex();
            return 1;
        }

        public static bool CheckIfUserExist(AmazonInfoModel amazonInfoModel)
        {
            string workerId = amazonInfoModel.WorkerId;
            mtx.WaitOne();
            
            if (dictOfUsers.ContainsKey(workerId))
            {
                mtx.ReleaseMutex();
                return true;
            }
            mtx.ReleaseMutex();
            return false;
        }
        
        #endregion
        
        #region data base
        public static async Task<bool> UploadUserToMongoAsync(AmazonInfoModel amazonInfoModel)
        {
            if (!CheckIfUserExist(amazonInfoModel))
            {
                return false;
            }

            string workerId = amazonInfoModel.WorkerId;
            var uri = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            MongoClient dbClient = new MongoClient(uri);
            var userCollection = dbClient.GetDatabase("MemoryGame").GetCollection<BsonDocument>("Users");
            mtx.WaitOne();
            await userCollection.InsertOneAsync(dictOfUsers[workerId].ToBsonDocument());
            dictOfUsers.Remove(workerId);
            mtx.ReleaseMutex();
            return true;
        }

        #endregion

    }
}