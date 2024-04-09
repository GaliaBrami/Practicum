using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public RoleNameDto Name { get; set; }
        public bool IsManager { get; set; }
        public DateTime StartDate { get; set; }
    }
}
