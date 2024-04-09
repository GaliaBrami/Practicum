using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IWorkerService
    {
        public Task<IEnumerable<Worker>> GetAllMembersAsync();

        public Task<Worker> GetByIdAsync(int id);

        public Task<Worker> AddAsync(Worker m);

        public Task<Worker> PutAsync(int id, Worker value);

        public Task<Worker> PutStatusAsync(int id);
        public Task<Worker> DeleteAsync(int id);
    }
}
