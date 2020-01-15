using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIS.Models.GisShop
{
    public class SimpleCategory
    {

        public SimpleCategory(string n, List<SimpleCategory> ls)
        {
            state = n;
            this.name = n.ToUpper();
            children = ls;
        }

        public string state { get; set; }
        public string name { get; set; } 
        public string type { get; set; } = "sub";
        public string icon { get; set; } = "arrow_right_alt";
        public List<SimpleCategory> children { get; set; } 
        //public List<string> SousCats { get; set; }

    }
}
