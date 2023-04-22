using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BTL_api.Controllers
{
    public class HomeController : Controller
    {
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
        public ActionResult Chi_tiet()
        {
            return View();
        }
        public ActionResult Dieukhoandichvu()
        {
            return View();
        }
        public ActionResult Chinhsachbaomat()
        {
            return View();
        }
    }
}
