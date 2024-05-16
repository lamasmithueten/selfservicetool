using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI.Models;
using sstWebAPI.Constants;
using sstWebAPI.Helpers;
using sstWebAPI.Models;
using sstWebAPI.Models.DTO.AuthenticationUser;

namespace SelfServiceWebAPI.Controllers
{
    /// <summary>
    /// controller for login and registrations
    /// </summary>
    /// <remarks>
    /// constructor for the user controller
    /// </remarks>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpPost]
        public IActionResult CreateUser(UserRegistrationModel registrationUser)
        {
            if (!registrationUser.IsValid(out string alertMessage))
            {
                return BadRequest(alertMessage);
            }

            //nicht sicher hiermit
            registrationUser.Email = registrationUser.Email.ToLower();

            //checks if account or username already exists in db
            if (_context.user.Any(x => x.email == registrationUser.Email || x.username == registrationUser.Username))
            {
                if (_context.user.Any(x => x.email == registrationUser.Email))
                {
                    return Conflict();
                }
                else
                {
                    return Conflict();
                }
            }

            //checks if application was already send for this account
            if (_context.registration_application.Any(y => y.email == registrationUser.Email || y.username == registrationUser.Username))
            {
                if (_context.registration_application.Any(y => y.email == registrationUser.Email))
                {
                    return Conflict();
                }
                else
                {
                    return Conflict();
                }
            }

            if (!UserRoles.Roles.Contains(registrationUser.Role))
            {
                registrationUser.Role = UserRoles.Employee;
            }

            //hashes the password
            string salt = CalcHash.GenerateSalt();
            registrationUser.Password = $"{CalcHash.GetHashString(registrationUser.Password, salt)}:{salt}";

            //all requirements met to save the application in db
            RegistrationModel application = new(registrationUser);
            _context.registration_application.Add(application);
            _context.SaveChanges();
            return Created();
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetUser()
        {
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            if (claims == null)
            {
                return Unauthorized();
            }
            var user_id_string = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (user_id_string == null)
            {
                return Unauthorized();
            }
            var user_id = Guid.Parse(user_id_string);
            var user = _context.user.Find(user_id);
            if(user == null)
            {
                return NotFound(user_id);
            }
            return Ok(user);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = UserRoles.Admin + "," + UserRoles.Management)]
        public IActionResult GetUserWithID(Guid id)
        {
            var user = _context.user.Find(id);
            if (user == null)
            {
                return NotFound(id);
            }
            return Ok(user);
        }
    }
}
