using Library.Entities;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<RoleName> AddAsync(RoleName r)
        {
            return await _roleRepository.AddAsync(r);
        }
        public async Task<IEnumerable<RoleName>> GetAllRolesAsync()
        {
            return await _roleRepository.GetRolesAsync();
        }



    }
}
