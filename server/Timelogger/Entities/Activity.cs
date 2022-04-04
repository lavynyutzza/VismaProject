using System;
using System.Collections.Generic;
using System.Text;

namespace Timelogger.Entities {
    [Serializable]
    public class Activity {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal HoursSpent { get; set; }

    }
}
