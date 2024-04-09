using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{

    public class Role
    {
        //static int count = 1;
        public int Id { get; set; }// = count++;
        //public int RoleNameId { get; set; }
        public RoleName? Name { get; set; }
        public bool IsManager { get; set; }
        public DateTime StartDate { get; set; }
    }
}
