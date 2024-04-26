using Microsoft.EntityFrameworkCore;
using SelfServiceWebAPI.Models;

namespace SelfServiceWebAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserModel> User { get; set; }
    }
}
