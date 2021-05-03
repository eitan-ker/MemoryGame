using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MemoryGame.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult DisagreePage()
        {
            return View();
        }
        public ActionResult ConsentIndex()
        {
            /*
            string assignmentId = Request.QueryString["assignmentId"];
            string workerId = Request.QueryString["workerId"];
            string hitId = Request.QueryString["hitId"];


            if (assignmentId == null || workerId == null || hitId == null)
            {
                Session["assignmentId"] = "1";
                Session["workerId"] = "12";
                Session["hitId"] = "123";
            }
            else
            {
                Session["assignmentId"] = assignmentId;
                Session["workerId"] = workerId;
                Session["hitId"] = hitId;
            }
            AmazonInfoModel amazonInfoModel = new AmazonInfoModel();
            amazonInfoModel.AssId = Session["assignmentId"].ToString();
            amazonInfoModel.HitId = Session["hitId"].ToString();
            amazonInfoModel.WorkerId = Session["workerId"].ToString();
            ClientsHandlerModel.AddNewUser(amazonInfoModel);
            */
            return View();
        }

        public ActionResult TooManyTries()
        {
            return View();
        }
        public ActionResult InstructionsOne()
        {
            //var bla = HttpContext.Session.GetString("assignmentId");
            return View();
        }
        public ActionResult InstructionsTwo()
        {
            return View();
        }

        public ActionResult Feedback()
        {
            return View();
        }

        public ActionResult PersonalDetails()
        {
            return View();
        }
        public ActionResult VerificationRules()
        {
            return View();
        }
        public ActionResult InterfaceExample()
        {
            return View();
        }
        public ActionResult MobileError()
        {
            return View();
        }
        public ActionResult SecondTimeError()
        {
            return View();
        }
        public ActionResult ErrorPage()
        {
            return View();
        }
        public ActionResult Game()
        {
            return View();
        }
        public ActionResult EndGame()
        {
            return View();
        }
        public ActionResult EndPage()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}