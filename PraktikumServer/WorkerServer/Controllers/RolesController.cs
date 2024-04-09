using AutoMapper;
using Library.Entities;
using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Services;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RolesController(IRoleService rService, IMapper mapper)
        {
            _roleService = rService;
            _mapper = mapper;
        }


        // GET: api/<MembersController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var role = await _roleService.GetAllRolesAsync();
            var roleDto = _mapper.Map<List<RoleNameDto>>(role);

            return Ok(roleDto);
        }

        // GET api/<MembersController>/5
        //[HttpGet("{name}")]
        //public async Task<ActionResult> GetByName(string name)
        //{
        //    var member = await _roleService.GetByName(name);
        //    if (member == null)
        //        return NotFound();
        //    var memberDto = _mapper.Map<RoleDto>(member);
        //    return Ok(member);
        //}

        // POST api/<MembersController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)

        {
            var roleToAdd = _mapper.Map<RoleName>(role);
            var newRole = await _roleService.AddAsync(roleToAdd);
            return Ok(newRole);
        }

        // PUT api/<MembersController>/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult> Put(int id, [FromBody] WorkerPostModel member)
        //{
        //    var memberToUpdate = _mapper.Map<Worker>(member);
        //    var newMember = await _roleService.PutAsync(id, memberToUpdate);
        //    if (newMember == null)
        //        return NotFound();
        //    return Ok(newMember);

        //}
        //[HttpPut("status/{id}")]
        //public async Task<ActionResult> PutStatus(int id)
        //{
        //    //var memberToUpdate = _mapper.Map<Worker>(member);
        //    var newMember = await _roleService.PutStatusAsync(id);
        //    if (newMember == null)
        //        return NotFound();
        //    return Ok(newMember);

        //}
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
