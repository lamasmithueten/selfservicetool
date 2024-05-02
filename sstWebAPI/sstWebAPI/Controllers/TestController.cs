using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Models.DTO;

namespace sstWebAPI.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TestController(AppDbContext context, IConfiguration config)
        {
            _context = context;
        }

        [HttpGet("GetAllUsers")]
        public List<UserModel> GetAllUsers()
        {
            return [.. _context.user];
        }

        [HttpGet("GetUserById")]
        public ActionResult GetUserById(Guid id)
        {
            UserModel? user = _context.user.Find(id);
            if (user == null)
            {
                return NotFound("Found no user with that id");
            }
            return Ok(user);
        }

        [HttpGet("GetUserByUsername")]
        public ActionResult GetUserByUsername(string name)
        {
            UserModel? user = _context.user.Where(x => x.username == name).FirstOrDefault();
            if (user == null)
            {
                return NotFound("Found no user with that name");
            }
            return Ok(user);
        }

        [HttpPost("CreateUser")]
        public ActionResult CreateUser(UserModel user)
        {
            _context.user.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPut("UpdateUser")]
        public ActionResult UpdateUser(UserModel user)
        {
            _context.user.Update(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpDelete("DeleteUser")]
        public ActionResult DeleteUser(Guid id)
        {
            UserModel? user = _context.user.Find(id);
            if (user == null)
            {
                return NotFound("Found no user with that id");
            }
            _context.user.Remove(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPost("registerUser")]
        public IActionResult register(UserRegistrationModel registrationuser)
        {
            //after this check every parameter of registrationuser is not null or consists of only whitespaces
            if (!registrationuser.IsValid(out string alertmessage))
            {
                return BadRequest(alertmessage);
            }

            registrationuser.Email = registrationuser.Email.ToLower();

            //checks if account or username already exists in db
            if (_context.user.Any(x => x.email == registrationuser.Email || x.username == registrationuser.Username))
            {
                if (_context.user.Any(x => x.email == registrationuser.Email))
                {
                    return BadRequest("account already exists.");
                }
                else
                {
                    return BadRequest("username already exists.");
                }
            }

            //all requirements met to save the user in db
            UserModel user = new(registrationuser);
            _context.user.Add(user);
            _context.SaveChanges();
            return Created();
        }
    }
}
