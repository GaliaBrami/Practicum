using Library.Entities;
using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<RoleName>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<RoleName> AddAsync(RoleName r)
        {
            _context.Roles.Add(r);
            await _context.SaveChangesAsync();
            return r;
        }


    }
}
