using AutoMapper;
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
    public class ManagersController : ControllerBase
    {
        private readonly IManagerService _managerService;
        private readonly IMapper _mapper;
        public ManagersController(IManagerService rService, IMapper mapper)
        {
            _managerService = rService;
            _mapper = mapper;
        }


        // GET: api/<MembersController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var manager = await _managerService.GetAllAsync();
            //var managerDto = _mapper.Map<List<Manager>>(manager);

            return Ok(manager);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ManagerPostModel manager)

        {
            var managerToAdd = _mapper.Map<Manager>(manager);
            var newManager = await _managerService.AddAsync(managerToAdd);
            return Ok(newManager);
        }

    }
}
