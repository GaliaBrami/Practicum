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
    public class ManagerRepository : IManagerRepository
    {
        private readonly DataContext _context;
        public ManagerRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Manager>> GetAsync()
        {
            return await _context.Managers.ToListAsync();
        }

        public async Task<Manager> AddAsync(Manager r)
        {
            _context.Managers.Add(r);
            await _context.SaveChangesAsync();
            return r;
        }

    }
}
