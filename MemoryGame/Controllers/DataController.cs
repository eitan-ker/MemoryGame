using MemoryGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;


namespace MemoryGame.Controllers
{
    public class 
        DataController : Controller
    {
        
        public AmazonInfoModel CreateAmazonInfoModel()
        {
            
            AmazonInfoModel amazonInfoModel = new AmazonInfoModel();
            amazonInfoModel.AssId = Session["assignmentId"].ToString();
            amazonInfoModel.HitId = Session["hitId"].ToString();
            amazonInfoModel.WorkerId = Session["workerId"].ToString();
            return amazonInfoModel;

        }

        public ActionResult TimeInPage(TimeInPageModel timeInPageModel)
        {
            Console.WriteLine(timeInPageModel);
            //AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            //ClientsHandlerModel.AddTimeModel(amazonInfoModel, timeInPageModel);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        
        [HttpGet]
        public string GetInitData()
        {
            InitData initData = new InitData();
            initData.overallTime = (3000 * 4 * 10).ToString();
            initData.personalTime = 3000.ToString();
            initData.numOfCards = 2.ToString();
            initData.numOfAgents =4.ToString();
            /*var data = {
                overallTime= "",// times in milliseconds
                personalTime: 3000,
                numOfCards: 2,
                numOfAgents: 4
            };*/
            return initData.ToJson();
        }

        [HttpPost]
        public void ReciveTurnsInfo()
        {
            
        }
        
    }
}