using AutoMapper;
using Library.Entities;
using Library.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using System.Data;

namespace Library
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<WorkerPostModel, Worker>().ReverseMap();
            CreateMap<RolePostModel, RoleName>().ReverseMap();
            CreateMap<ManagerPostModel, Manager>().ReverseMap();
            CreateMap<RoleDto, Role>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => new RoleName { Name = src.Name.Name }));
            CreateMap<RoleName, RoleNameDto>();


        }
    }
}
