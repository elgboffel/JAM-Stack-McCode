using Microsoft.EntityFrameworkCore;
using McCodeAPI.Models.Domain;

namespace McCodeAPI.Data
{
    public class McCodeAPIContext: DbContext
    {
        public McCodeAPIContext(DbContextOptions<McCodeAPIContext> options)
            : base(options)
        { }

        public DbSet<Comment> Comments { get; set; }
    }
}
