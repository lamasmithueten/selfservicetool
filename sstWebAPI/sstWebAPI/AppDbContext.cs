using Microsoft.EntityFrameworkCore;
using SelfServiceWebAPI.Models;
using sstWebAPI.Models;
using sstWebAPI.Models.DB;

namespace SelfServiceWebAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserModel> user { get; set; }

        public DbSet<RegistrationModel> registration_application { get; set; }

        public DbSet<VacationApplicationModel> vacation_request { get; set; }

        public DbSet<VacationDaysModel> vacation_days { get; set; }

        public DbSet<PasswordResetModel> password_reset { get; set; }
    }
}
