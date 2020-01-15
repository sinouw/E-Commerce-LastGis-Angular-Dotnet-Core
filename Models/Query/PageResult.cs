using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GIS.Models.Query
{
    public class PageResult<T>
    {
        public int Count { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public List<T> Items { get; set; }
        public List<string> Brands { get; set; }
        public string FilterProdName { get; set; }
        public List<string> Filters { get; set; }
    }
}
