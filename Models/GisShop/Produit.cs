using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.GisShop;

namespace WebAPI.Models.ZahraShop
{
    public class Produit
    {
        public Produit()
        {
            Images = new HashSet<Image>();
            Caracteristiques = new HashSet<Caracteristique>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdProd { get; set; }
        public string NomProduit { get; set; }
        public string Description { get; set; }
        public double Prix { get; set; }
        public bool Disponible { get; set; } = true;
        public double Remise { get; set; } 
        public string Couleur { get; set; }  
        public string Marque { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;


        //Navigation props

        public SousCategorie SousCategorie { get; set; }
        public Guid IdScat { get; set; }

        public ICollection<Caracteristique> Caracteristiques{ get; set; }

        //Images List
        public ICollection<Image> Images { get; set; }
        public string FrontImg { get; set; }
    }
}
