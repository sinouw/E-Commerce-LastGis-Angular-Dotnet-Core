using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.ZahraShop
{
    public class Categorie
    {
        public Categorie()
        {
            SousCategories = new HashSet<SousCategorie>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdCat { get; set; }
        public string Ncategorie { get; set; }
        public DateTime CreationDate { get; set; }

        //Navigation props
        public User User { get; set; }
        public string UserId { get; set; }

        //List SousCategories
        public ICollection<SousCategorie> SousCategories { get; set; }
    }
}
