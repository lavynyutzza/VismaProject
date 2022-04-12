using System;
using System.ComponentModel.DataAnnotations;

namespace Timelogger.Entities {
    [Serializable]
    public class Project{
        [Required(ErrorMessage = "Project id is mandatory!")]
        public int Id { get; set; }
        [Required(ErrorMessage = "Project name is mandatory!")]
        [MinLength(3, ErrorMessage = "Project name must have at least 3 characters!")]
        public string Name { get; set; }

        private DateTime? deadline;
        public DateTime? Deadline { 
            get {
                return DateTime.SpecifyKind(deadline.GetValueOrDefault(), DateTimeKind.Utc);
            }
            set { deadline = DateTime.SpecifyKind(value.GetValueOrDefault(), DateTimeKind.Utc);
            } 
        }
        public string Description { get; set; }
        public string ClientName { get; set; }
    }
}
