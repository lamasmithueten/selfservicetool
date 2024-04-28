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
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        /// <summary>
        /// constructor for the user controller
        /// </summary>
        /// <param name="context"></param>
        /// <param name="config"></param>
        public UserController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

    }
}
