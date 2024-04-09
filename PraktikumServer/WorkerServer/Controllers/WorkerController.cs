using Library.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static System.Reflection.Metadata.BlobBuilder;
using System.Linq;
using Solid.Service;
using System.Collections.Generic;
using Solid.Core.Services;
using AutoMapper;
using Solid.Core.DTOs;
using AutoMapper.Execution;
using Library.Models;
using System.Diagnostics.Metrics;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Data.Repositories;
using System.Data;


namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IMapper _mapper;
        private readonly IRoleRepository _roleNameRepository;
        public WorkerController(IWorkerService wService, IMapper mapper, IRoleRepository r)
        {
            _workerService = wService;
            _mapper = mapper;
            _roleNameRepository = r;

        }


        // GET: api/<MembersController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var members = await _workerService.GetAllMembersAsync();
            var membersDto = _mapper.Map<List<WorkerDto>>(members);

            return Ok(membersDto);
        }

        // GET api/<MembersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var member = await _workerService.GetByIdAsync(id);
            if (member == null)
                return NotFound();
            var memberDto = _mapper.Map<WorkerDto>(member);
            return Ok(memberDto);
        }

        // POST api/<MembersController>

        //public async Task<ActionResult> Post([FromBody] WorkerPostModel w)

        //{
        //    var worker = _mapper.Map<Worker>(w);
        //    var newMember =await _workerService.AddAsync(worker);
        //    return Ok(newMember);
        //}
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WorkerPostModel workerPostModel)

        {
            // Retrieve all existing RoleNames from the database
            var existingRoleNames1 = _roleNameRepository.GetRolesAsync();
            var existingRoleNames = existingRoleNames1;

            var worker = new Worker
            {
                FirstName = workerPostModel.FirstName,
                LastName = workerPostModel.LastName,
                Identity = workerPostModel.Identity,
                BirthDate = workerPostModel.BirthDate,
                StartDate = workerPostModel.StartDate,
                Gender = workerPostModel.Gender
            };

            foreach (var roleNameDto in workerPostModel.Roles)
            {
                // Check if the roleNameDto.Name exists in the existingRoleNames list
                var existingRoleName = existingRoleNames.Result.FirstOrDefault(r => r.Name == roleNameDto.Name.Name);


                // If the RoleName already exists, associate it with the worker
                worker.Roles.Add(new Role { Name = existingRoleName, IsManager = roleNameDto.IsManager, StartDate = roleNameDto.StartDate });


            }


            var newMember = await _workerService.AddAsync(worker);
            return Ok(newMember);
        }

        // PUT api/<MembersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] WorkerPostModel workerPostModel)
        {
            var existingRoleNames1 = _roleNameRepository.GetRolesAsync();
            var existingRoleNames = existingRoleNames1;

            //var memberToUpdate = _mapper.Map<Worker>(workerPostModel);
            var worker = new Worker
            {
                FirstName = workerPostModel.FirstName,
                LastName = workerPostModel.LastName,
                Identity = workerPostModel.Identity,
                BirthDate = workerPostModel.BirthDate,
                StartDate = workerPostModel.StartDate,
                Gender = workerPostModel.Gender
            };

            foreach (var roleNameDto in workerPostModel.Roles)
            {
                // Check if the roleNameDto.Name exists in the existingRoleNames list
                var existingRoleName = existingRoleNames.Result.FirstOrDefault(r => r.Name == roleNameDto.Name.Name);


                // If the RoleName already exists, associate it with the worker
                worker.Roles.Add(new Role { Name = existingRoleName, IsManager = roleNameDto.IsManager, StartDate = roleNameDto.StartDate });


            }


            var newW = await _workerService.PutAsync(id, worker);
            if (newW == null)
                return NotFound();
            return Ok(newW);

        }
        [HttpPut("status/{id}")]
        public async Task<ActionResult> PutStatus(int id)
        {
            var newW = await _workerService.PutStatusAsync(id);
            if (newW == null)
                return NotFound();
            return Ok(newW);

        }
        //not needed real delete only logical-status delete!
        // DELETE api/<MembersController>/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(int id)
        //{
        //    var memberToDelete =await _workerService.DeleteAsync(id);

        //    if (memberToDelete == null)
        //        return NotFound();

        //    return Ok(memberToDelete);
        //}
    }

}
