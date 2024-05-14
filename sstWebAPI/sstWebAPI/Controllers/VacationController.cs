using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DB;
using sstWebAPI.Models.DTO;
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
        public IActionResult VacationRequest(CreateVacationApplicationModel model)
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

            _context.vacation_request.Add(new VacationApplicationModel(model, user_id));
            _context.SaveChanges();

            return Created();
        }

        [HttpGet]
        public IActionResult WorkdaysCalcTest()
        {
            var result = WordkdaysCalc.calcNumberOfWorkdays(new DateOnly(2024,5,6), new DateOnly(2024, 5, 27));

            return Ok(result);
        }
    }
}
