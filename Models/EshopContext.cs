using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.ZahraShop;
using WebAPI.Models.GisShop;
using GIS.Models.GisShop;

namespace WebAPI.Models
{
    public class EshopContext : IdentityDbContext
    {
        public EshopContext(DbContextOptions options) : base(options)
        {

        }

        // Creating Roles for the application
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                    new { Id = "1", Name = "SuperAdmin", NormalizedName = "SUPERADMIN" },
                    new { Id = "2", Name = "Admin", NormalizedName = "ADMIN" }
                );

            builder.Entity<User>()
                .HasMany(c => c.Categories)
                .WithOne(e => e.User)
                .HasForeignKey(u=>u.UserId);

            builder.Entity<User>()
                .HasMany(c => c.SousCategories)
                .WithOne(e => e.User)
                .HasForeignKey(u => u.UserId);

            builder.Entity<Categorie>()
               .HasMany(c => c.SousCategories)
               .WithOne(e => e.Categorie);

            builder.Entity<SousCategorie>()
                .HasMany(c => c.Produits)
                .WithOne(e => e.SousCategorie)
                .HasForeignKey(c=>c.IdScat);

            builder.Entity<Produit>()
                .HasMany(c => c.Images)
                .WithOne(e => e.Produit);

            builder.Entity<Produit>()
                .HasMany(c => c.Caracteristiques)
                .WithOne(e => e.Produit);


        }

        //Users
        public DbSet<User> ApplicationUsers { get; set; }
        //Eshop
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<SousCategorie> SousCategories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Produit> Produits { get; set; }
        public DbSet<Caracteristique> Caracteristique { get; set; }
        public DbSet<Pub> PubsImages { get; set; }
    }
}
