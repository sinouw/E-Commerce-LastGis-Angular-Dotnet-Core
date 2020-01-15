using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIS.Models.DTO
{
    public class CategSousCateg
    {
        public CategSousCateg(string name,List<string>soucategs)
        {
            this.CategName = name;
            this.SousCategs = soucategs;
        }

        public string CategName { get; set; }
        public List<string> SousCategs{ get; set; }
    }
}
