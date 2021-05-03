using MemoryGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace MemoryGame.Controllers
{
    public class DataController : Controller
    {
        public ActionResult TimeInPage(TimeInPageModel timeInPageModel)
        {
            Console.WriteLine(timeInPageModel);
            //AmazonInfoModel amazonInfoModel = CreateAmazonInfoModel();
            //ClientsHandlerModel.AddTimeModel(amazonInfoModel, timeInPageModel);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}