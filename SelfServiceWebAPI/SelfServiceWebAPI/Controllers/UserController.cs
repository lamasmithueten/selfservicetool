using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SelfServiceWebAPI.Controllers
{
    /// <summary>
    /// controller for login and registrations
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// login request
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        //[Route("Login")]
        public String Login(String name)
        {
            return name;
        }

        /// <summary>
        /// register user
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        public String Register(String name)
        {
            return name.ToString();
        }
    }
} 
