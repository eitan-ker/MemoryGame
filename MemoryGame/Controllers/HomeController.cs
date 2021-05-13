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
            return View();
        }

        public ActionResult TooManyTries()
        {
            return View();
        }
        public ActionResult InstructionsOne()
        {
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

        public ActionResult Game1()
        {
            return View();
        }
    }
}