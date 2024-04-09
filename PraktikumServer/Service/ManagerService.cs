
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
    public class ManagerService : IManagerService
    {

        private readonly IManagerRepository _managerRepository;

        public ManagerService(IManagerRepository managerRepository)
        {
            _managerRepository = managerRepository;
        }
        public async Task<Manager> AddAsync(Manager r)
        {
            return await _managerRepository.AddAsync(r);
        }
        public async Task<IEnumerable<Manager>> GetAllAsync()
        {
            return await _managerRepository.GetAsync();
        }



    }
}
