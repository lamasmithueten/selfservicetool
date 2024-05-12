using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Constants;
using sstWebAPI.Models;
using sstWebAPI.Models.DTO;

namespace sstWebAPI.Controllers
{
    /// <summary>
    /// constructor for AuthenticationController
    /// </summary>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationRequestController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        /// <summary>
        /// get all registration applications
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult GetRegisterApplications()
        {
            var list = _context.registration_application.ToList();

            if (!list.Any())
            {
                return NotFound("No applications found");
            }

            return Ok(list);
        }

        /// <summary>
        /// accept or deny registration application
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        ///
        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult EditRegistrationRequest(EditRegistrationApplicationModel request)
        {
            RegistrationModel? registrationModel = _context.registration_application.Find(request.ID);

            if (registrationModel == null)
            {
                return NotFound("Application does not exist");
            }

            if (request.AcceptOrDecline)
            {
                UserModel userModel = new UserModel(registrationModel);

                if (request.EditRole != null)
                {
                    if (UserRoles.Roles.Contains(request.EditRole.ToLower()))
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
    }
}
