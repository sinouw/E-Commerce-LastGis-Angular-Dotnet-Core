using Microsoft.AspNetCore.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.ZahraShop;

namespace WebAPI.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Categories = new HashSet<Categorie>();
            SousCategories = new HashSet<SousCategorie>();
        }

        [Column(TypeName ="nvarchar(150)")]
        public string FullName { get; set; }
        public bool IsActive { get; set; }
        public string Gender { get; set; } = "Male";
        public string Role { get; set; }

        public ICollection<Categorie> Categories { get; set; }
        public ICollection<SousCategorie> SousCategories { get; set; }
    }
}
