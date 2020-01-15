using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.GisShop;
using WebAPI.Models.ZahraShop;

namespace GIS.Models.Query.dto
{
    public class QueriedProductDto
    {
        public Guid IdProd { get; set; }
        public string NomProduit { get; set; }
        public string Description { get; set; }
        public double Prix { get; set; }
        public bool Disponible { get; set; } = true;
        public double Remise { get; set; }
        public string Couleur { get; set; }
        public string Marque { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;

        public Guid IdScat { get; set; }
        public string NsousCategorie { get; set; }
        public string FrontImg { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<Caracteristique> Caracteristiques { get; set; }

     
    }
}
