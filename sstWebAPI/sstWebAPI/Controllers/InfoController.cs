using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace sstWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
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
            Log.Information("Get-request for 'api/Info'");

            return "WebApi by Lukas and Nicolas for Sofware Engineering";
        }
    }
}
