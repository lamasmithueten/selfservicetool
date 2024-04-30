using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;

namespace sstWebAPI.Controllers
{
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
        public ActionResult GetUserById(int id)
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
            UserModel? user = _context.user.Find(name);
            if (user == null)
            {
                return NotFound("Found no user with that id");
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
        public ActionResult DeleteUser(int id)
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
    }
}
