using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.ZahraShop
{
    public class SousCategorie
    {
        public SousCategorie()
        {
            Produits = new HashSet<Produit>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdScat { get; set; }
        public string NsousCategorie { get; set; }
        public DateTime CreationDate { get; set; }

        //Navigation props
        public Guid CategorieId { get; set; }
        public Categorie Categorie { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }

        //Product List
        public ICollection<Produit> Produits { get; set; }
    }
}
