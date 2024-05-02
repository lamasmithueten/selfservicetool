using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Constants;
using sstWebAPI.Models;
using sstWebAPI.Models.DTO;

namespace sstWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;


        /// <summary>
        /// constructor for AuthenticationController
        /// </summary>
        /// <param name="context"></param>
        /// <param name="config"></param>
        public AuthenticationController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        /// <summary>
        /// logins the user
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public IActionResult Login(UserLoginModel loginUser)
        {   
            //gets the whole record of the user with the username/email specified in loginUser
            UserModel? user = _context.user.Where(x => x.username == loginUser.usernameOrEmail || x.email == loginUser.usernameOrEmail.ToLower()).SingleOrDefault();

            if (user == null)
            {
                return NotFound($"{loginUser.usernameOrEmail} not found in database");
            }

            //checks if the hashes of both passwords are matching
            if (!String.IsNullOrWhiteSpace(user.password) && !String.IsNullOrWhiteSpace(loginUser.password)
                && loginUser.password.Equals(user.password))
            {
                //Generates JWT Token for the User and returns it
                return Ok(GenerateToken(user));
            }
            else
            {
                return BadRequest($"wrong password for user {loginUser.usernameOrEmail}");
            }
        }

        /// <summary>
        /// registers the user
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        public IActionResult Register(UserRegistrationModel registrationUser)
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
                    return BadRequest("Account already exists.");
                }
                else
                {
                    return BadRequest("Username already exists.");
                }
            }

            if (_context.registration_application.Any(y => y.email == registrationUser.Email || y.username == registrationUser.Username))
            {
                if (_context.registration_application.Any(y => y.email == registrationUser.Email))
                {
                    return BadRequest("Application was already send for this email");
                }
                else
                {
                    return BadRequest("Username already exists.");
                }
            }

            if (!UserRoles.Roles.Contains(registrationUser.Role))
            {
                registrationUser.Role = UserRoles.Employee;
            }

            //all requirements met to save the application in db
            RegistrationModel application = new(registrationUser);
            _context.registration_application.Add(application);
            _context.SaveChanges();
            return Created(); 
        }

        /// <summary>
        /// get all registration applications
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("GetRegisterApplications")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult GetRegisterApplications()
        {
            var list = _context.registration_application.ToList();

            if (!list.Any())
            {
                return BadRequest("No applications found");
            }

            return Ok(list);
        }

        /// <summary>
        /// accept or deny registration application
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        ///
        [HttpPost("EditRegistrationRequest")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult EditRegistrationRequest(EditRegistrationApplicationModel request)
        {
            RegistrationModel? registrationModel = _context.registration_application.Find(request.ID);

            if (registrationModel == null)
            {
                return BadRequest("Application does not exist");
            }

            if (request.AcceptOrDecline)
            {
                UserModel userModel = new UserModel(registrationModel);

                if(request.EditRole != null)
                {
                   if(UserRoles.Roles.Contains(request.EditRole.ToLower()))
                    {
                        userModel.role = request.EditRole;
                    }
                }

                _context.user.Add(userModel);
                _context.SaveChanges();
            }

            _context.registration_application.Remove(registrationModel);
            _context.SaveChanges();

            return Created();
        }


        #region private helper funtions

        /// <summary>
        /// generates a JWT for session handling
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string GenerateToken(UserModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,user.username ?? ""),
                new Claim(ClaimTypes.Role,user.role ?? ""),
                new Claim(ClaimTypes.Email,user.email ?? ""),
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString())
            };
            var token = new JwtSecurityToken(_config["JwtSettings:Issuer"],
                _config["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        #endregion
    }
}
