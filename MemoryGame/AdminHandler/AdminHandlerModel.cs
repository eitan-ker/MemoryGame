using System;
using System.Collections.Generic;
using MemoryGame.Models;
using MemoryGame.Models.Game;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MemoryGame.AdminHandler
{
    public class AdminHandlerModel
    {
        public static GameModel GetReplyFromDB(AmazonInfoModel amazonInfoModel)
        {
            var uri = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            MongoClient dbClient = new MongoClient(uri);
            
            var userCollection = dbClient.GetDatabase("MemoryGame").GetCollection<AllUserDataModel>("Users").Find(new BsonDocument()).ToList();
            List<AmazonInfoModel> amazonInfoModelList = new List<AmazonInfoModel>();

            foreach (var item in userCollection)
            {
                if (string.Equals(amazonInfoModel.AssId, item._amazonInfoModel.AssId) && string.Equals(amazonInfoModel.HitId, item._amazonInfoModel.HitId) && string.Equals(amazonInfoModel.WorkerId, item._amazonInfoModel.WorkerId))
                {
                    return item._gameModel;
                }
            }
            return null;
        }
        
        public static List<AmazonInfoModel> GetAllUsersFromDB()
        {
           
            var uri = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            MongoClient dbClient = new MongoClient(uri);
            
            var userCollection = dbClient.GetDatabase("MemoryGame").GetCollection<AllUserDataModel>("Users").Find(new BsonDocument()).ToList();
            List<AmazonInfoModel> amazonInfoModelList = new List<AmazonInfoModel>();

            foreach (var item in userCollection)
            {
                AmazonInfoModel temp = new AmazonInfoModel();
                temp.AssId = String.Copy(item._amazonInfoModel.AssId);
                temp.WorkerId = String.Copy(item._amazonInfoModel.WorkerId);
                temp.HitId = String.Copy(item._amazonInfoModel.HitId);
                amazonInfoModelList.Add(temp);
            }
            return amazonInfoModelList;

        }
        
        public static AllUserDataModel GetAllUserDataFromDB(AmazonInfoModel amazonInfoModel)
        {
            var uri = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            MongoClient dbClient = new MongoClient(uri);
            amazonInfoModel = new AmazonInfoModel();
            amazonInfoModel.AssId = "1";
            amazonInfoModel.WorkerId = "436";
            amazonInfoModel.HitId = "123";
            var userCollection = dbClient.GetDatabase("MemoryGame").GetCollection<AllUserDataModel>("Users").Find(new BsonDocument()).ToList();

            foreach (var item in userCollection)
            {
                if (string.Equals(amazonInfoModel.AssId, item._amazonInfoModel.AssId) && string.Equals(amazonInfoModel.HitId, item._amazonInfoModel.HitId) && string.Equals(amazonInfoModel.WorkerId, item._amazonInfoModel.WorkerId))
                {
                    return item;
                }
            }
            return null;
        }

    }
}