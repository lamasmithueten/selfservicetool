using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI.Models;
using SelfServiceWebAPI;
using sstWebAPI.Constants;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DB;
using sstWebAPI.Models.DTO.Vacation;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace sstWebAPI.Controllers
{
    /// <summary>
    /// controller for creating and editing vacation application
    /// </summary>
    /// <remarks>
    /// constructor for the vacation controller
    /// </remarks>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class VacationManagementController(AppDbContext context) : Controller
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        [Authorize(Roles = UserRoles.Admin +","+UserRoles.Management)]
        public IActionResult GetVacationApplicationsOfUser(Guid user_id)
        {
            var applications = user_id == Guid.Empty ? _context.vacation_request.ToList() : _context.vacation_request.Where(x => x.ID_user == user_id).ToList();

            var pending = new List<VacationApplicationModel>();
            var accepted = new List<VacationApplicationModel>();
            var declined = new List<VacationApplicationModel>();

            foreach (var application in applications)
            {
                if (application.state == VacationApplicationStates.Pending)
                {
                    pending.Add(application);
                }
                else if (application.state == VacationApplicationStates.Accepted)
                {
                    accepted.Add(application);
                }
                else
                {
                    declined.Add(application);
                }
            }

            return Ok(new GetVacationApplicationsModel(pending, accepted, declined));
        }


        #region helper_functions

        #endregion

    }
}