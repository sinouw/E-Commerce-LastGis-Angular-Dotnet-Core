using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.ZahraShop
{
    public class Image
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdImage { get; set; }
        public string ImageName { get; set; }

        //Navigation props
        public Guid ProduitId { get; set; }
        public Produit Produit { get; set; }
    }
}
