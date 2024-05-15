using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

            updateVacationDays(vacationDays, days);
            _context.vacation_request.Add(new VacationApplicationModel(model, user_id, days));
            _context.SaveChanges();
            return Created();
        }

        private bool CheckIfEnoughDays(VacationDaysModel vacationDays, int days)
        {
            return (vacationDays.total_days - (vacationDays.used_days + vacationDays.planned_days + days) >= 0);
        }

        private int updateVacationDays(VacationDaysModel vacationDays, int days)
        {
            return vacationDays.planned_days = vacationDays.planned_days += days;
        }

        [HttpGet]
        public IActionResult WorkdaysCalcTest()
        {
            var result = WordkdaysCalc.calcNumberOfWorkdays(new DateOnly(2024,5,6), new DateOnly(2024, 5, 27));

            return Ok(result);
        }
    }
}
