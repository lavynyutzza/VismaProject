using System;

namespace Timelogger.Entities {
    [Serializable]
    public class Project {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public string ClientName { get; set; }
        //public decimal TotalTimeSpent { get { return 0; } }
    }
}
