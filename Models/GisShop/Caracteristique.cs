using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.ZahraShop;

namespace WebAPI.Models.GisShop
{
    public class Caracteristique
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdCarac { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        //Navigation props
        public Guid ProduitId { get; set; }
        public Produit Produit { get; set; }
    }
}
