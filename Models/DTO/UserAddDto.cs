using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gis.Models.DTO
{
    public class UserAddDto
    {
        public string FullName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }

        public UserAddDto(string f,string r, string e, string p,string u)
        {
            this.FullName = f;
            this.Role = r;
            this.Email = e;
            this.PhoneNumber = p;
            this.UserName = u;
        }
        
    }
}
