using System.Collections.Immutable;

namespace sstWebAPI.Constants
{
    public static class UserRoles
    {
        public const string Admin = "admin";
        public const string Management = "management";
        public const string Employee = "employee";

        public static ImmutableList<String>  Roles = ImmutableList.Create(Employee, Admin, Management);
    }
}
