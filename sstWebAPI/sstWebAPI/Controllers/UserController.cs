using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        public UserController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        /// <summary>
        /// login request
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("Login")]
        public String Login()
        {
            ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var claims = identity.Claims;
                return claims.FirstOrDefault(O => O.Type == ClaimTypes.Name)?.Value ?? string.Empty;
            }

            return "";
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

        private UserModel? getCurrentUser(Guid id)
        {
            return _context.user.Find(id);
        }
    }
}
