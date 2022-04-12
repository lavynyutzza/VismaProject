using System;
using System.ComponentModel.DataAnnotations;

namespace Timelogger.Entities {
    [Serializable]
    public class Activity {
        public int Id { get; set; }

        [Required(ErrorMessage = "Project id is mandatory!")]
        public int ProjectId { get; set; }

        [Required(ErrorMessage = "Activity name is mandatory!")]
        [MinLength(3, ErrorMessage = "Activity name must have at least 3 characters!")]
        public string Name { get; set; }

        public string Description { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "The number of hours is invalid!")]
        public int HoursSpent { get; set; }

    }
}
