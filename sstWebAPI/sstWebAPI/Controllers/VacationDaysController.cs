using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO.Vacation;

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
            VacationDaysModel? vacationDaysRecord = _context.vacation_days.Where(x => x.ID_user == id).SingleOrDefault();

            if (vacationDaysRecord == null)
            {
                return NotFound();
            }

            return Ok(vacationDaysRecord);
        }

        [HttpGet("GetWorkingDays")] 
        public IActionResult GetWorkingDays(CreateVacationApplicationModel stringModel)
        {
            if (!CreateVacationApplicationModel.createVacationModel(stringModel.first_day, stringModel.last_day, out var model))
            {
                return BadRequest("Wrong format for Date");
            }

            return Ok(WordkdaysCalc.calcNumberOfWorkdays(model.first_day, model.last_day));
        }

        [HttpPost("GetVacationDays")]
        public IActionResult GetVacationDays(CreateVacationApplicationModel stringModel, bool enhanced)
        {
            if (!CreateVacationApplicationModel.createVacationModel(stringModel.first_day, stringModel.last_day, out var model))
            {
                return BadRequest("Wrong format for Date");
            }

            var vacationDict = WordkdaysCalc.calcDicOfWeekendsAndHolidays(model.first_day, model.last_day);

            if (!enhanced)
            {            
                return Ok(vacationDict.Count);
            }
            return Ok(vacationDict);
        }
    }
}
