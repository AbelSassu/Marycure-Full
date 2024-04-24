using Microsoft.EntityFrameworkCore;

namespace Marycure.Controllers
{


    public class MarycureContext : DbContext
    {
        public MarycureContext(DbContextOptions<MarycureContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Lavoratrice>().ToTable("Lavoratrici");
            modelBuilder.Entity<Appuntamento>().ToTable("Appuntamenti");
        }

        public DbSet<Servizio> Servizi { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Lavoratrice> Lavoratrici { get; set; }
        public DbSet<Appuntamento> Appuntamenti { get; set; }

    }

}