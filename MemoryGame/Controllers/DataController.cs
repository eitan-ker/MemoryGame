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
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddVerificationRulesModel(amazonInfoModel, verificationRulesModel);
            if (isGood == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
        public ActionResult FeedBackInfo( FeedBackModel feedBackModel)
        {
            AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            int isGood = ClientsHandlerModel.AddFeedBackModel(amazonInfoModel, feedBackModel);
            if (isGood == 0)
            {
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
        
    }
}