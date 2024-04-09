using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IManagerService
    {
        public Task<IEnumerable<Manager>> GetAllAsync();

        public Task<Manager> AddAsync(Manager r);
    }
}
