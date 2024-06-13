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
using Microsoft.EntityFrameworkCore;

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
            //var applications = user_id == Guid.Empty ? GetAllVacationsWithUsername() : GetAllVacationsWithUsernameForUserId(user_id);
                
            if(user_id == Guid.Empty)
            {
                return Ok(GetAllVacationsWithUsername());
            } else
            {
                return Ok(GetAllVacationsWithUsernameForUserId(user_id, _context));
            }
        }

        [HttpPatch]
        [Authorize(Roles = UserRoles.Admin + "," + UserRoles.Management)]
        public IActionResult EditVacationApplication(EditVacationApplicationModel model)
        {
            var application = _context.vacation_request.Find(model.application_id);
            if (application == null)
            {
                return NotFound(model.application_id);
            }

            var vacationDays = _context.vacation_days.Where(x => x.ID_user == application.ID_user).FirstOrDefault();
            if (vacationDays == null)
            {
                return NotFound("No vacation days found");
            }

            if (application.first_day < DateOnly.FromDateTime(DateTime.Now))
            {
                return BadRequest("cant edit applications in the past");
            }

            if (model.state == VacationApplicationStates.Pending)
            {
                if(application.state == VacationApplicationStates.Accepted)
                {
                    vacationDays.used_days -= application.number_of_days;
                    vacationDays.planned_days += application.number_of_days;
                }else if(application.state == VacationApplicationStates.Declined)
                {
                    vacationDays.planned_days += application.number_of_days;
                }
                application.state = VacationApplicationStates.Pending;
            } else if (model.state == VacationApplicationStates.Accepted)
            {
                if (application.state == VacationApplicationStates.Pending)
                {
                    vacationDays.planned_days -= application.number_of_days;
                    vacationDays.used_days += application.number_of_days;
                }
                else if (application.state == VacationApplicationStates.Declined)
                {
                    vacationDays.used_days += application.number_of_days;
                }
                application.state = VacationApplicationStates.Accepted;
            } else if (model.state == VacationApplicationStates.Declined)
            {
                if (application.state == VacationApplicationStates.Pending)
                {
                    vacationDays.planned_days -= application.number_of_days;
                }
                else if (application.state == VacationApplicationStates.Accepted)
                {
                    vacationDays.used_days -= application.number_of_days;
                }
                application.state = VacationApplicationStates.Declined;
            } else
            {
                return BadRequest($"unknown state {model.state}");
            }
            application.reason = model.reason;
            _context.SaveChanges();
            return Ok();
        }


        #region helper_functions

        private GetVacationApplicationsModel GetAllVacationsWithUsername()
        { 
            var applications = from vacation in _context.vacation_request
                        join user in _context.user on vacation.ID_user equals user.ID
                        select new
                        {
                            TabelleVacation = vacation,
                            TabelleUser = user,
                        };

            var pending = new List<VactionApplicationWithUserModel>();
            var accepted = new List<VactionApplicationWithUserModel>();
            var declined = new List<VactionApplicationWithUserModel>();

            foreach (var application in applications)
            {
                var vacation = application.TabelleVacation;
                var user = application.TabelleUser;

                if (vacation.state == VacationApplicationStates.Pending)
                {
                    pending.Add(new VactionApplicationWithUserModel(vacation.ID, vacation.ID_user, user.firstname, user.lastname, vacation.first_day,
                        vacation.last_day, vacation.number_of_days, vacation.state, vacation.reason));
                }
                else if (vacation.state == VacationApplicationStates.Accepted)
                {
                    accepted.Add(new VactionApplicationWithUserModel(vacation.ID, vacation.ID_user, user.firstname, user.lastname, vacation.first_day,
                        vacation.last_day, vacation.number_of_days, vacation.state, vacation.reason));
                }
                else
                {
                    declined.Add(new VactionApplicationWithUserModel(vacation.ID, vacation.ID_user, user.firstname, user.lastname, vacation.first_day,
                        vacation.last_day, vacation.number_of_days, vacation.state, vacation.reason));
                }
            }
            return new GetVacationApplicationsModel(pending,accepted,declined);
        }

        public static GetVacationApplicationsModel GetAllVacationsWithUsernameForUserId(Guid userId, AppDbContext context)
        {
            var applications=  from vacation in context.vacation_request
                   join user in context.user on vacation.ID_user equals user.ID where user.ID == userId
                   select new
                   {
                       TabelleVacation = vacation,
                       TabelleUser = user,
                   };

            var pending = new List<VactionApplicationWithUserModel>();
            var accepted = new List<VactionApplicationWithUserModel>();
            var declined = new List<VactionApplicationWithUserModel>();

            foreach (var application in applications)
            {
                var vacation = application.TabelleVacation;
                var user = application.TabelleUser;

                if (vacation.state == VacationApplicationStates.Pending)
                {
                    pending.Add(new VactionApplicationWithUserModel(vacation.ID, vacation.ID_user, user.firstname, user.lastname, vacation.first_day,
                        vacation.last_day, vacation.number_of_days, vacation.state, vacation.reason));
                }
                else if (vacation.state == VacationApplicationStates.Accepted)
                {
                    accepted.Add(new VactionApplicationWithUserModel(vacation.ID, vacation.ID_user, user.firstname, user.lastname, vacation.first_day,
                        vacation.last_day, vacation.number_of_days, vacation.state, vacation.reason));
                }
                else
                {
                    declined.Add(new VactionApplicationWithUserModel(vacation.ID, vacation.ID_user, user.firstname, user.lastname, vacation.first_day,
                        vacation.last_day, vacation.number_of_days, vacation.state, vacation.reason));
                }
            }
            return new GetVacationApplicationsModel(pending, accepted, declined);
        }

        #endregion

    }
}