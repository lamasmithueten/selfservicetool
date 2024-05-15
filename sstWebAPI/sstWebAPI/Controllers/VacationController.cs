using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DB;
using sstWebAPI.Models.DTO.Vacation;
using System.Security.Claims;
using System.Security.Principal;

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
    public class VacationController(AppDbContext context) : Controller
    {
        private readonly AppDbContext _context = context;

        [HttpPost]
        [Authorize]
        public IActionResult VacationRequest(StringVacationApplicationModel stringModel)
        {
            var model = new CreateVacationApplicationModel(stringModel);

            var claims = HttpContext.User.Identity as ClaimsIdentity;
            if (claims == null)
            {
                return Unauthorized();
            }
            var user_id_string = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (user_id_string == null)
            {
                return Unauthorized();
            }
            var user_id = Guid.Parse(user_id_string);
            var days = WordkdaysCalc.calcNumberOfWorkdays(model.first_day, model.last_day);
            if (days <= 0)
            {
                return UnprocessableEntity($"Difference between first day: {model.first_day} and last day: {model.last_day} needs to be greater than 0");
            }
            var vacationDays = _context.vacation_days.Where(x => x.ID_user == user_id).FirstOrDefault();
            if (vacationDays == null)
            {
                return NotFound("Keine Urlaubstage für Nutzer gefunden");
            }
            if(!CheckIfEnoughDays(vacationDays, days))
            {
                return BadRequest("User has not enough days left");
            }

            var overlapsingVacation = DetectVacationOpverlaps(model.first_day, model.last_day, user_id);
            if (overlapsingVacation == null)
            {
                return Conflict(overlapsingVacation);
            }

            updateVacationDays(vacationDays, days);
            _context.vacation_request.Add(new VacationApplicationModel(model, user_id, days));
            _context.SaveChanges();
            return Created();
        }

        [HttpGet]
        public IActionResult WorkdaysCalcTest()
        {
            var result = WordkdaysCalc.calcNumberOfWorkdays(new DateOnly(2024,5,6), new DateOnly(2024, 5, 27));

            return Ok(result);
        }

        private bool CheckIfEnoughDays(VacationDaysModel vacationDays, int days)
        {
            return (vacationDays.total_days - (vacationDays.used_days + vacationDays.planned_days + days) >= 0);
        }

        private int updateVacationDays(VacationDaysModel vacationDays, int days)
        {
            return vacationDays.planned_days = vacationDays.planned_days += days;
        }

        private VacationApplicationModel? DetectVacationOpverlaps(DateOnly firstDate, DateOnly lastDate, Guid userId)
        {
            var vacations = _context.vacation_request.Where(x => x.ID_user == userId);

            if (vacations.IsNullOrEmpty())
            {
                return null;
            }

            foreach (var vacation in vacations)
            {
                if (AreDatesOverlapsing(firstDate, lastDate, vacation.first_day, vacation.last_day))
                {
                    return vacation;
                }
            }
            return null;
        }

        private bool AreDatesOverlapsing(DateOnly start1, DateOnly end1, DateOnly start2, DateOnly end2)
        {
            return start1.CompareTo(end2) <= 0 && start2.CompareTo(end1) <= 0;
        }

    }
}
