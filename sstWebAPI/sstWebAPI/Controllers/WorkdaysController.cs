using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO.Vacation;

namespace sstWebAPI.Controllers
{
    /// <summary>
    /// controller for calculating number of workdays in between two dates
    /// </summary>
    /// <remarks>
    /// constructor for the WorkdaysController controller
    /// </remarks>
    /// <param name="context"></param>
    /// <param name="config"></param>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class WorkdaysController(AppDbContext context) : Controller
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        [Authorize]
        public IActionResult GetWorkingDays(string startDate, string endDate, bool enhanced)
        {
            if (!CreateVacationApplicationModel.createVacationModel(startDate, endDate, out var model))
            {
                return BadRequest("Wrong format for Date");
            }

            int workingdays = WordkdaysCalc.calcNumberOfWorkdays(model.first_day, model.last_day);

            if (!enhanced)
            {
                return Ok(workingdays);
            }

            var vacationDict = WordkdaysCalc.calcDicOfWeekendsAndHolidays(model.first_day, model.last_day);
            return Ok(new { workingdays, vacationDict });
        }
    }
}
