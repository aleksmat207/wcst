using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Design;
using wcstApp.Core.Entities;

namespace wcst.Core
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Rule> Rules { get; set; }

    }
}
