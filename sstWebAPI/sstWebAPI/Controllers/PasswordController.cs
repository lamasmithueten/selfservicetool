
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DB;

namespace sstWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PasswordController(AppDbContext context, IConfiguration configuration) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        /// <summary>
        /// Controller to reset password of user
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult CreateResetRequest(string email)
        {
            int expiresIn = 20;

            if (email.IsNullOrEmpty())
            {
                return BadRequest("No email");
            }

            var userEmail = email.ToLower();

            var user = _context.user.Where(x => x.email == userEmail).FirstOrDefault();
            if (user == null)
            {
                return Created();
            }

            string token = "";

            while (true)
            {
                var tokenPuffer = createRandomString(1000000, 6);
                var doubleCheckPuffer = _context.password_reset.Where(x => x.reset_token == tokenPuffer).FirstOrDefault();
                if (doubleCheckPuffer == null)
                {
                    token = tokenPuffer;
                    break;
                }
            }

            try
            {
                sendEmail(userEmail, "test", token);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var entry = _context.password_reset.Where(x => x.user_id == user.ID).FirstOrDefault();
            if (entry != null) 
            {
                entry.reset_token = token;
                entry.expires = DateTime.Now.AddMinutes(expiresIn);
            } else
            {
                _context.password_reset.Add(new PasswordResetModel(user.ID, token, DateTime.Now.AddMinutes(expiresIn)));
            }
            _context.SaveChanges();

            return Created();
        }

        private string createRandomString(int maxValue, int maxLength)
        {
            Random rand = new Random();
            // Generating a random number. 
            var randValue = rand.Next(0, maxValue);
            var str = randValue.ToString($"D{maxLength}");
            return str;
        }

        private void sendEmail(string toEmail, string suject, string body)
        {
            var fromEmail = _configuration["ServiceEmailData:Email"] ?? throw new Exception("ServiceEmailData:Email is not found in the configuration.");
            var appPassword = _configuration["ServiceEmailData:AppPassword"] ?? throw new Exception("ServiceEmailData:AppPassword is not found in the configuration.");
            SendEmailHelper.SendEmail(fromEmail: fromEmail, emailAppPassword: appPassword, toEmail: toEmail, subject: suject, text: body);
        }
    }
}
