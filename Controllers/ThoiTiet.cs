using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace BTL_api.Controllers
{

    public class ThoiTiet : Controller
    {
        public ActionResult Index(string place)
        {
            ViewBag.Place = place;
            return View();
        }

        public ActionResult TheoGio(string place)
        {
            ViewBag.Place = place;
            return View();
        }
        public ActionResult NgayMai(string place)
        {
            ViewBag.Place = place;
            return View();
        }
        public ActionResult BaNgayToi(string place)
        {
            ViewBag.Place = place;
            return View();
        }
        public ActionResult NamNgayToi(string place)
        {
            ViewBag.Place = place;
            return View();
        }
        public ActionResult MuoiNgayToi(string place)
        {
            ViewBag.Place = place;
            return View();
        }
    }
}
