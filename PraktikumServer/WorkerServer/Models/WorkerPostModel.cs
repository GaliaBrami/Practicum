using Library.Entities;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using System.Reflection;

namespace Library.Models
{
    public class WorkerPostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public Gender Gender { get; set; }
        public List<RoleDto> Roles { get; set; }
    }
}
