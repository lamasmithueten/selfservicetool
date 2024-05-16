using System.Security.Claims;

namespace sstWebAPI.Helpers
{
    public class GetJwtDataHelper
    {
        public static bool GetUserIdFromJwt(out Guid user_id, HttpContext context)
        {
            user_id = Guid.NewGuid();
            var claims = context.User.Identity as ClaimsIdentity;
            if (claims == null)
            {
                return false;
            }
            var user_id_string = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (user_id_string == null)
            {
                return false ;
            }
            user_id = Guid.Parse(user_id_string);
            return true;
        }
    }
}
