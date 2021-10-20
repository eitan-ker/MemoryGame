using MemoryGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using MemoryGame.ClientHandler;
using MemoryGame.Models.EndGameModels;
using MemoryGame.Models.FeedBackModels;
using MemoryGame.Models.Game;
using MemoryGame.Models.VerificationRulesModels;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace MemoryGame.Controllers
{
    public class DataController : Controller
    {

        public AmazonInfoModel CreateAmazonInfoModel()
        {
            
            AmazonInfoModel amazonInfoModel = new AmazonInfoModel();
                 amazonInfoModel.AssId = Session["assignmentId"].ToString();
                 amazonInfoModel.HitId = Session["hitId"].ToString();
                 amazonInfoModel.WorkerId = Session["workerId"].ToString();
                 return amazonInfoModel;

        }

       public ActionResult VerificationRulesInfo(VerificationRulesModel verificationRulesModel)
        {
            //Console.WriteLine($"2222222  {verificationRulesModel.Answers.ToString()}");

            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddVerificationRulesModel(amazonInfoModel, verificationRulesModel);
            if (isGood == 0)
            {
                //Console.WriteLine("whatttttttttttttttttttttttttttttttt");

                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //Console.WriteLine($"{verificationRulesModel.Answers.ToString()}");

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        public  ActionResult FeedBackInfo( FeedBackModel feedBackModel)
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddFeedBackModel(amazonInfoModel, feedBackModel);
            if (isGood == 0)
            {
                //Console.WriteLine("whatttttttttttttttttttttttttttttttt");

                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public ActionResult PersonalDetailsInfo(PersonalDetails personalDetailsModel)
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddPersonalDetailsModel(amazonInfoModel, personalDetailsModel);
            if (isGood == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
//AddGameModel
        public ActionResult GameManegerInfo(GameModel gameModel)
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddGameModel(amazonInfoModel, gameModel);
           
            if (isGood == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        public ActionResult EndGameInfo( EndGameModel endGameModel)
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddEndGameModel(amazonInfoModel, endGameModel);
           
            if (isGood == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        public ActionResult TimeInPage( TimeInPageModel timeInPageModel)
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddTimeModel(amazonInfoModel, timeInPageModel);
            if (isGood == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        public async Task<ActionResult> IsNewClient()
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();

            var uri = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            MongoClient dbClient = new MongoClient(uri);

            var userCollection = await dbClient.GetDatabase("MemoryGame").GetCollection<AllUserDataModel>("Users").Find(new BsonDocument()).ToListAsync();

            foreach (var c in userCollection)
            {
                if (c._amazonInfoModel.WorkerId.Equals(amazonInfoModel.WorkerId))
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

                }

            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);

        }
        

        


        public async Task<ActionResult> ClientIsDone()
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            
            bool res = await ClientsHandlerModel.UploadUserToMongoAsync(amazonInfoModel);
            Console.WriteLine($"{res.ToString()}");
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        
        public ActionResult ClientFinishedGame()
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            
            int res = ClientsHandlerModel.AddIsClientFinishedGameModel(amazonInfoModel);
            //Console.WriteLine($"{res.ToString()}");
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public string GetScore()
        {
            return System.Configuration.ConfigurationManager.AppSettings["Score"].ToString();
        }
        public string InitGameData()
        {

            InitData initData = new InitData();
            initData.OverallTime = long.Parse(System.Configuration.ConfigurationManager.AppSettings["OverallTime"].ToString());
            initData.PersonalTime = long.Parse(System.Configuration.ConfigurationManager.AppSettings["PersonalTime"].ToString());
            
            initData.NumOfCards = new List<int>();
            initData.NumOfCards.Add(Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["NumOfCards1"].ToString()));
            initData.NumOfCards.Add(Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["NumOfCards2"].ToString()));
            
            initData.NumOfAgents = Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["NumOfAgents"].ToString());
            initData.HintConfig = Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["HintConfig"].ToString());
            
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddInitDataModel(amazonInfoModel, initData);
            
            var json = JsonConvert.SerializeObject(initData);
            return json;
        }

       
        
    }
}