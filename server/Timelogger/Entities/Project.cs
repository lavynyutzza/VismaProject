using System;

namespace Timelogger.Entities {
    [Serializable]
    public class Project {
        public int Id { get; set; }
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
        //public decimal TotalTimeSpent { get { return 0; } }
    }
}
