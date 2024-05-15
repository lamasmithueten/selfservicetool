using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO.AuthenticationUser;

namespace sstWebAPI.Controllers
{
    /// <summary>
    /// constructor for the user controller
    /// </summary>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SessionController(AppDbContext context, IConfiguration config) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IConfiguration _config = config;

        [HttpPost]
        public IActionResult CreateSession(UserLoginModel loginUser)
        {
            //gets the whole record of the user with the username/email specified in loginUser
            UserModel? user = _context.user.Where(x => x.username.Equals(loginUser.usernameOrEmail) || x.email.Equals(loginUser.usernameOrEmail.ToLower())).SingleOrDefault();

            if (user == null)
            {
                return NotFound($"{loginUser.usernameOrEmail} not found in database");
            }

            //get password hashes and salt from the database
            if(string.IsNullOrWhiteSpace(user.password) && string.IsNullOrWhiteSpace(loginUser.password))
            {
                return BadRequest();
            }

            string passwordHashDB = user.password[..user.password.IndexOf(':')];
            string salt = user.password[(user.password.IndexOf(':') + 1)..];
            string passwordHashLogin = CalcHash.GetHashString(loginUser.password, salt);

            //checks if the hashes of both passwords are matching
            if (passwordHashLogin.Equals(passwordHashDB))
            {
                //Generates JWT Token for the User and returns it
                return Ok(GenerateToken(user));
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// generates a JWT for session handling
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string GenerateToken(UserModel user)
        {
            string jwtKey = _config["JwtSettings:Key"] ?? throw new Exception("JwtSettings:Key is not found in the configuration.");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
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
    }
}
