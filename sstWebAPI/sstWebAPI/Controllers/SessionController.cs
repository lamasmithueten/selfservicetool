using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO;

namespace sstWebAPI.Controllers
{
    /// <summary>
    /// constructor for the user controller
    /// </summary>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController(AppDbContext context, IConfiguration config) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IConfiguration _config = config;

        [HttpPost]
        public IActionResult CreateSession(UserLoginModel loginUser)
        {
            //gets the whole record of the user with the username/email specified in loginUser
            UserModel? user = _context.user.Where(x => x.username == loginUser.usernameOrEmail || x.email == loginUser.usernameOrEmail.ToLower()).SingleOrDefault();

            if (user == null)
            {
                return NotFound($"{loginUser.usernameOrEmail} not found in database");
            }

            //checks if the hashes of both passwords are matching

            string passwordDB = user.password.Substring(0, user.password.IndexOf(":"));
            string passwordLogin = loginUser.password;
            string salt = user.password.Substring(user.password.IndexOf(":") + 1);

            if (!string.IsNullOrWhiteSpace(user.password) && !string.IsNullOrWhiteSpace(loginUser.password)
                && CalcHash.GetHashString(passwordLogin, salt).Equals(passwordDB))
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
    }
}
