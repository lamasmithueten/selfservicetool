using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
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
        /// Test method for controller without the need of authorization
        /// </summary>
        /// <returns></returns>
        [HttpPost("Info")]
        public string Info()
        {
            return "WebApi by Lukas and Nicolas for Sofware Engineering";
        }

        /// <summary>
        /// login request
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public IActionResult Login(UserLoginModel loginUser)
        {
            UserModel? user = _context.user.Where(x=> x.username == loginUser.username).FirstOrDefault();

            if (user == null)
            {
                return NotFound($"{loginUser.username} not found in database");
            }
            else
            {
                if (user.password != null && loginUser.password != null && GetHashString(loginUser.password).Equals(GetHashString(user.password))) // TODO: Change after Register function is implemented
                {
                    return Ok(GenerateToken(user));
                }
                else
                {
                    return BadRequest($"wrong password for user {loginUser.username}");
                }
            }
        }

        //ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;

        //if (identity != null)
        //{
        //    var claims = identity.Claims;
        //    return claims.FirstOrDefault(O => O.Type == ClaimTypes.Name)?.Value ?? string.Empty;
        //}


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
            _context.user.Add(user);
            _context.SaveChanges();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        [HttpPost("GenerateJWTToken")]
        public string GenerateJWTToken(UserModel user)
        {
            return GenerateToken(user);
        }

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

        private static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
        private static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        private UserModel? getCurrentUser(Guid id)
        {
            return _context.user.Find(id);
        }
    }
}
