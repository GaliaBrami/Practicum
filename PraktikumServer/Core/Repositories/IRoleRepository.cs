using Library.Entities;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IRoleRepository
    {
        public Task<List<RoleName>> GetRolesAsync();

        public Task<RoleName> AddAsync(RoleName r);
    }
}
