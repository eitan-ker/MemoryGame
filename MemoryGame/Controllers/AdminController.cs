using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MemoryGame.Models;
using MemoryGame.AdminHandler;
using Newtonsoft.Json;

namespace MemoryGame.Controllers
{
    public class AdminController : Controller
    {
        
      

        
        public ActionResult Login()
        {
            return View();
        }


        public ActionResult ChooseReplay()
        {
            return View();
        }


        ///MemoryGame/Admin/CheckPassword
        ///  Password :rider
        /// Name :admin
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
        
        
        // /MemoryGame/Admin/GetAllUsers
        public string GetAllUsers()
        {
            var json = JsonConvert.SerializeObject(AdminHandlerModel.GetAllUsersFromDB());
            return json;
            /*if (!string.Equals(Session["auth"], "yes"))
            {
                var json = JsonConvert.SerializeObject(AdminHandlerModel.GetAllUsersFromDB());
                return json;

            }*/

            return "BadRequest";
        }
        
        // /MemoryGame/Admin/GetReplyOfUser
        public string GetReplyOfUser(AmazonInfoModel amazonInfoModel)
        {
            var json = JsonConvert.SerializeObject(AdminHandlerModel.GetAllUserDataFromDB(amazonInfoModel));
            return json;
            /*if (!string.Equals(Session["auth"], "yes"))
            {
                var json = JsonConvert.SerializeObject(AdminHandlerModel.GetAllUserDataFromDB(amazonInfoModel));
                return json;

            }*/
           

            return "BadRequest";
        }
    }
}