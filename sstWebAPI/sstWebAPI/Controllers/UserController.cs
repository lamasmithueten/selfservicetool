using Microsoft.AspNetCore.Http;
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

        public UserController(AppDbContext context)
        {
            _context = context;
        }

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

        [HttpPost("CreateUser")]
        public IActionResult CreateUser(UserModel user)
        {
            user.ID = Guid.NewGuid();
            _context.User.Add(user);
            _context.SaveChanges();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser(Guid id)
        {
            UserModel user = _context.User.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
