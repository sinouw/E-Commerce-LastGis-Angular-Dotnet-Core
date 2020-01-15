using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIS.Models.Query.dto
{
    public class produitDto
    {
        public Guid IdProd { get; set; }
        public string NomProduit { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
