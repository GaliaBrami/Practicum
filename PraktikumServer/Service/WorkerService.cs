using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using Solid.Core.Services;

namespace Solid.Service
{
    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository _memberRepository;

        public WorkerService(IWorkerRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }
        public async Task<Worker> AddAsync(Worker b)
        {
            return await _memberRepository.AddAsync(b);
        }
        public async Task<IEnumerable<Worker>> GetAllMembersAsync()
        {
            return await _memberRepository.GetMembersAsync();
        }
        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _memberRepository.GetByIdAsync(id);
        }

        public async Task<Worker> PutAsync(int id, Worker value)
        {
            return await _memberRepository.PutAsync(id, value);


        }

        public async Task<Worker> PutStatusAsync(int id)
        {

            return await _memberRepository.PutStatusAsync(id);
        }

        public async Task<Worker> DeleteAsync(int id)
        {
            return await _memberRepository.DeleteAsync(id);
        }


    }
}
