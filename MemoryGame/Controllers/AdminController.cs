using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MemoryGame.Models;

namespace MemoryGame.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult DataTable()
        {
            return View();
        }

        // GET: Admin
        public ActionResult login()
        {
            return View();
        }

        public ActionResult CheckPassword(AdminModel adminModel)
        {
            string realPass = System.Configuration.ConfigurationManager.AppSettings["Password"].ToString();
            string realUser = System.Configuration.ConfigurationManager.AppSettings["Name"].ToString();
            if (string.Equals(realPass, adminModel.Password) && string.Equals(realUser, adminModel.Name))
            {
                Session["auth"] = "yes";

                return new HttpStatusCodeResult(HttpStatusCode.OK);

            }
            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);


        }
    }
}