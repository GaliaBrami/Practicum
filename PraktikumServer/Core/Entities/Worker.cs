using Solid.Core.Entities;
using System.Data;

namespace Library.Entities
{
    public enum Gender { Male, Female };
    public class Worker
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Identity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public bool Status { get; set; } = true;
        public Gender Gender { get; set; }
        public List<Role>? Roles { get; set; }
        public Worker()
        {
            Roles = new List<Role>();
        }

    }
}
