using Microsoft.EntityFrameworkCore;
using System;
using wcstApp.Core.Entities;

namespace wcstApp.Core
{
   public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Card> Cards { get; set; }
    }
}
