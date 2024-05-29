using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;

namespace sstWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VirtualEnvironmentsController(AppDbContext context) : ControllerBase
    {
        AppDbContext _context = context;

        [HttpGet]
        public IActionResult GetVirtualEnvironments()
        {
            return Ok(_context.virtualenvexamples.Select(x => x.name).ToList());
        }
    }
}
