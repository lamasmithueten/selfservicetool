using Microsoft.AspNetCore.Mvc;

namespace sstWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfoController : ControllerBase
    {
        /// <summary>
        /// Test method for controller without the need of authorization
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string Info()
        {
            return "WebApi by Lukas and Nicolas for Sofware Engineering";
        }
    }
}
