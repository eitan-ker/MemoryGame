using MemoryGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

            if (Request.Browser.IsMobileDevice)
            {
                return RedirectToAction("MobileError");
            }


            //Session["turn"] = "client";
            if (Session["last_page"] != null)
            {
                return RedirectToAction("ErrorPage");
            }

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
            //ClientsHandlerModel.AddNewUser(amazonInfoModel);
            Session["last_page"] = "ConsentIndex";

            return View();
        }

        public ActionResult TooManyTries()
        {
            return View();
        }

        public ActionResult InstructionsOne()
        {

            if (!Session["last_page"].Equals("ConsentIndex"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "InstructionsOne";

            return View();
        }

        public ActionResult InstructionsTwo()
        {
            if (!Session["last_page"].Equals("InstructionsOne"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "InstructionsTwo";
            return View();
        }

        public ActionResult Feedback()
        {
            if (!Session["last_page"].Equals("EndGame"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "Feedback";
            return View();
        }

        public ActionResult PersonalDetails()
        {
            if (!Session["last_page"].Equals("VerificationRules"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "PersonalDetails";
            return View();
        }

        public ActionResult VerificationRules()
        {
            if (!Session["last_page"].Equals("interfaceExample"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "VerificationRules";
            return View();
        }

        public ActionResult InterfaceExample()
        {
            if (!Session["last_page"].Equals("InstructionsTwo"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "interfaceExample";
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
            if (!Session["last_page"].Equals("PersonalDetails"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "Game";
            return View();
        }

        public ActionResult EndGame()
        {
            if (!Session["last_page"].Equals("Game"))
            {
                return RedirectToAction("ErrorPage");
            }

            Session["last_page"] = "EndGame";
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

        public AmazonInfoModel CreateAmazonInfoModel()
        {
            AmazonInfoModel amazonInfoModel = new AmazonInfoModel();
            amazonInfoModel.AssId = Session["assignmentId"].ToString();
            amazonInfoModel.HitId = Session["hitId"].ToString();
            amazonInfoModel.WorkerId = Session["workerId"].ToString();
            return amazonInfoModel;
        }

        public ActionResult Game1()
        {
            return View();
        }

        
    }


}