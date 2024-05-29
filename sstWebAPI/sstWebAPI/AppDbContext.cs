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

        public DbSet<ProvisioningRequestModel> provisioning_request { get;set; }

        public DbSet<VirtualEnvironmentModel> existing_environment { get; set; }

        public DbSet<ProvisioningDeclinedModel> provisioning_declined { get; set; }

        public DbSet<VirtualEnvExamples> virtualenvexamples { get; set; }
    }
}
