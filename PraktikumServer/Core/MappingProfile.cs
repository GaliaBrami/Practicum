using AutoMapper;
using AutoMapper.Execution;
using Library.Entities;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Worker = Library.Entities.Worker;//רשם שיש כפילות?!?!?!?

namespace Solid.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Worker, WorkerDto>().ReverseMap();
            CreateMap<RoleName, RoleDto>().ReverseMap();
        }
    }
}
