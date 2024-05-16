using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using SelfServiceWebAPI.Models;
using sstWebAPI.Constants;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DTO.Vacation;
using System.Globalization;
using System.Security.Claims;

namespace sstWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class VacationDaysController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        
        [HttpGet("{id}")]
        [Authorize(Roles = UserRoles.Admin + "," + UserRoles.Management)]
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
        [Authorize]
        public IActionResult GetVacationDaysJWT()
        {
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

            UserModel? user = _context.user.Find(user_id);

            if (user == null)
            {
                return NotFound();
            }

            VacationDaysModel? vacationDaysRecord = _context.vacation_days.Where(x => x.ID_user == user_id).SingleOrDefault();

            return Ok(vacationDaysRecord);
        }

        [HttpPatch]
        [Authorize(Roles = UserRoles.Admin+","+UserRoles.Management)]
        public IActionResult ChangeTotalVacationDays(int totalDays, Guid userID)
        {
           var vacationDaysRecord = _context.vacation_days.Where(x => x.ID_user == userID).FirstOrDefault();

            if(vacationDaysRecord == null)
            {
                return NotFound(userID);
            }

            vacationDaysRecord.total_days = totalDays;
            _context.SaveChanges();
            return Ok(vacationDaysRecord);
        }
    }
}
