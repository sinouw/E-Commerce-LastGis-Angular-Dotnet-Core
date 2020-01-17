using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gis.Models.DTO
{
    public class SimpleCaracDto
    {
        public SimpleCaracDto(string key, string listValues)
        {
            Key = key;
            Value = listValues;
        }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
