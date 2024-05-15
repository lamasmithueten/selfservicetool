using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sstWebAPI.Constants;

namespace SelfServiceWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserManagementController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        [Authorize(Roles =UserRoles.Admin+","+UserRoles.Management)]
        public IActionResult GetUser(Guid user_id)
        {
            var user = _context.user.Find(user_id);
            if (user == null)
            {
                return NotFound(user_id);
            }
            return Ok(user);
        }
    }
}
