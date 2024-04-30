﻿using Microsoft.EntityFrameworkCore;
using SelfServiceWebAPI.Models;
using sstWebAPI.Models;

namespace SelfServiceWebAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserModel> user { get; set; }

        public DbSet<RegistrationModel> registration_application { get; set; }
    }
}
