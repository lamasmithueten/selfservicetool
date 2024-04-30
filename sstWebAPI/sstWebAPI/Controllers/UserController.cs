using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI.Models;

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

        /// <summary>
        /// gets the user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetUser")]
        public IActionResult GetUser(Guid id)
        {
            UserModel? user = getCurrentUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        /// <summary>
        /// gets the current user with its ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private UserModel? getCurrentUser(Guid id)
        {
            return _context.user.Find(id);
        }
    }
}
