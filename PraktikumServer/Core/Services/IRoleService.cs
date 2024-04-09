using Library.Entities;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IRoleService
    {
        public Task<IEnumerable<RoleName>> GetAllRolesAsync();

        public Task<RoleName> AddAsync(RoleName r);
    }
}
