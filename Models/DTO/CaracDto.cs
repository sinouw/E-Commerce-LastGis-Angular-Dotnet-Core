using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gis.Models.DTO
{
    public class CaracDto
    {
        public CaracDto(string key , List<string> listValues)
        {
            Key = key;
            Values = listValues;
        }
        public string Key { get; set; }
        public List<string> Values{ get; set; }

    }
}
