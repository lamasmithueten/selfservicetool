using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI;
using Serilog;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DB;

namespace sstWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PasswordController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        /// <summary>
        /// Controller to reset password of user
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult CreateResetRequest(string email)
        {
            if (email.IsNullOrEmpty())
            {
                return BadRequest("No email");
            }

            var userEmail = email.ToLower();

            var user = _context.user.Where(x => x.email == userEmail).FirstOrDefault();
            if (user == null)
            {
                //Theoretisch nicht zurückgeben, da Nutzer nicht wissen soll, ob Account existiert
                return NotFound("No user with this email found");
            }

            string token = "";

            while (true)
            {
                var tokenPuffer = createRandomString(10);
                var doubleCheckPuffer = _context.password_reset_request.Where(x => x.reset_token == tokenPuffer).FirstOrDefault();
                if (doubleCheckPuffer == null)
                {
                    token = tokenPuffer;
                    break;
                }
            }

            try
            {
                SendEmailHelper.SendEmail("", userEmail, "passwort reset test", token);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            _context.password_reset_request.Add(new PasswordResetRequestModel(user.ID, token));
            _context.SaveChanges();

            return Created();
        }

        private string createRandomString(int length)
        {
            Random rand = new Random();

            // Choosing the size of string 
            // Using Next() string 
            int randValue;
            string str = "";
            for (int i = 0; i < length; i++)
            {

                // Generating a random number. 
                randValue = rand.Next(0, 26);

                // Appending the letter to string. 
                str = str + randValue.ToString();
            }
            return str;
        }
    }
}
