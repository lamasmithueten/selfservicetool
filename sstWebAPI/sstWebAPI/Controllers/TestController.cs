using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using Serilog;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO.AuthenticationUser;

namespace sstWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TestController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet("GetAllUsers")]
        public List<UserModel> GetAllUsers()
        {
            Log.Information("Get-request for 'api/GetAllUsers'");
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
            Log.Information("Get-request for 'api/GetUserById' => " + id.ToString());
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
            Log.Information("Get-request for 'api/GetUserByUsername' => " + name);
            return Ok(user);
        }
/*
        [HttpPost("CreateUser")]
        public ActionResult CreateUser(UserModel user)
        {
            string salt = CalcHash.GenerateSalt();
            user.password = $"{CalcHash.GetHashString(user.password, salt)}:{salt}";
            _context.user.Add(user);
            _context.vacation_days.Add(new VacationDaysModel(userId: user.ID));
            _context.SaveChanges();
            return Ok(user);
        }*/

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

        [HttpPost("RegisterUser")]
        public IActionResult Register(UserRegistrationModel registrationuser)
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
                    return Conflict("account already exists.");
                }
                else
                {
                    return Conflict("username already exists.");
                }
            }

            string salt = CalcHash.GenerateSalt();
            registrationuser.Password = $"{CalcHash.GetHashString(registrationuser.Password, salt)}:{salt}";

            //all requirements met to save the user in db
            UserModel user = new(registrationuser);
            _context.user.Add(user);
            _context.vacation_days.Add(new VacationDaysModel(userId: user.ID));
            _context.SaveChanges();
            return Created();
        }
    }
}
