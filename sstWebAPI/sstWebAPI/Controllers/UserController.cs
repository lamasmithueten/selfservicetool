using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI.Models;
using sstWebAPI.Models;

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
        /// logins the user
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public IActionResult Login(UserLoginModel loginUser)
        {
            //gets the whole record of the user with the username specified in loginUser
            UserModel? user = _context.user.Where(x => x.username == loginUser.username).FirstOrDefault();

            if (user == null)
            {
                return NotFound($"{loginUser.username} not found in database");
            }
            else
            {
                //checks if the hashes of both passwords are matching
                if (!String.IsNullOrWhiteSpace(user.password) && !String.IsNullOrWhiteSpace(loginUser.password)
                    && GetHashString(loginUser.password).Equals(user.password)) // TODO: Check if hashing is nescessary if frontend already hashes?
                {
                    //Generates JWT Token for the User and returns it
                    return Ok(GenerateToken(user));
                }
                else
                {
                    return BadRequest($"wrong password for user {loginUser.username}");
                }
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
            //after this check every parameter of registrationUser is not null or consists of only whitespaces
            if(!registrationUser.IsValid(out string alertMessage)) 
            { 
                return BadRequest(alertMessage);
            }

            //checks if account or username already exists in db
            if (_context.user.Any(x => x.email == registrationUser.email || x.username == registrationUser.username))
            {
                if (_context.user.Any(x => x.email == registrationUser.email))
                {
                    return BadRequest("Account already exists.");
                }
                else
                {
                    return BadRequest("Username already exists.");
                }
            }

            //all requirements met to save the user in db
            registrationUser.password = GetHashString(registrationUser.password); // TODO: Check if hashing is nescessary
            UserModel user = new(registrationUser);
            _context.user.Add(user);
            _context.SaveChanges();
            return CreatedAtAction("GetUser", new { id = user.ID }, user);
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

        /// <summary>
        /// hashes the given string
        /// </summary>
        /// <param name="inputString"></param>
        /// <returns></returns>
        private static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }

        /// <summary>
        /// get the hash byte array
        /// </summary>
        /// <param name="inputString"></param>
        /// <returns></returns>
        private static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
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

        #endregion
    }
}
