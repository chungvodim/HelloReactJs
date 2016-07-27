using HelloReactJs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace HelloReactJs.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IList<CommentModel> _comments;
        static HomeController()
        {
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
        }
        public ActionResult Index()
        {
            return View();
        }
        // Improving Performance with Output Caching. The output is cached for 10 seconds.
        // Content is cached in three locations: the web server, any proxy servers, and the web browser
        // By default, the Location property has the value Any
        // If you are displaying different information to different users then you should cache the information only on the client
        // In some situations, you might want different cached versions of the very same content => VaryByParam = "id"
        //[OutputCache(Duration = 10, VaryByParam = "none", Location = OutputCacheLocation.None)]
        //The OutputCache attribute is used here to prevent browsers from caching the response
        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult Comments()
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
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