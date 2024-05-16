using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Constants;
using sstWebAPI.Models;
using sstWebAPI.Models.DTO.AuthenticationUser;

namespace sstWebAPI.Controllers
{
    /// <summary>
    /// constructor for RegistrationApplicationController
    /// </summary>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RegistrationApplicationController(AppDbContext context) : ControllerBase
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
                return NotFound();
            }

            if (request.AcceptOrDecline)
            {
                UserModel userModel = new(registrationModel);

                if (request.EditRole != null)
                {
                    if (UserRoles.Roles.Contains(request.EditRole.ToLower()))
                    {
                        userModel.role = request.EditRole;
                    }
                }

                _context.vacation_days.Add(new VacationDaysModel(userModel.ID));
                _context.user.Add(userModel);
            }

            _context.registration_application.Remove(registrationModel);
            _context.SaveChanges();

            return Created();
        }
    }
}
