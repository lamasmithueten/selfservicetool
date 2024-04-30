using Microsoft.EntityFrameworkCore;
using Playground.Models;
using System;

namespace Playground
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
