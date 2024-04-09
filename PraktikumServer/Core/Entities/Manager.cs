using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public class Manager
    {
        public int Id { get; set; }
        public string? ManagerName { get; set; } //= count++;
        public string? Password { get; set; }
        public bool CanAddManager { get; set; }
    }
}
