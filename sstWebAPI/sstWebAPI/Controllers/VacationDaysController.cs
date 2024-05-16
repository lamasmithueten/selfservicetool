using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO.Vacation;
using System.Globalization;

namespace sstWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacationDaysController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet("{id}")]
        public IActionResult GetVacationDays(Guid id)
        {
            UserModel? user = _context.user.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            VacationDaysModel? vacationDaysRecord = _context.vacation_days.Where(x => x.ID_user == id).SingleOrDefault();

            return Ok(vacationDaysRecord);
        }

        [HttpGet] 
        public IActionResult GetWorkingDays(string startDate, string endDate, bool enhanced)
        {
            if (!CreateVacationApplicationModel.createVacationModel(startDate, endDate, out var model))
            {
                return BadRequest("Wrong format for Date");
            }

            int workingdays = WordkdaysCalc.calcNumberOfWorkdays(model.first_day, model.last_day);
            var vacationDict = WordkdaysCalc.calcDicOfWeekendsAndHolidays(model.first_day, model.last_day);

            if (!enhanced)
            {
                return Ok(workingdays);
            }
            return Ok(new {workingdays, vacationDict });
        }
    }
}
