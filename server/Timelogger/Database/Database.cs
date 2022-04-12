using System;
using System.Collections.Generic;
using System.Text;
using Timelogger.Entities;

namespace Timelogger {
    public static class Database {

        public static void SeedDatabase(ApiContext context) {
            SeedProjects(context);
            SeedActivities(context);
        }

        private static void SeedActivities(ApiContext context) {
            context.Activities.Add(new Activity { Id = 1, Name = "Insert Projects", HoursSpent = 2, ProjectId = 1 });
            context.Activities.Add(new Activity { Id = 2, Name = "Update projects", HoursSpent = 3, ProjectId = 1 });
            context.Activities.Add(new Activity { Id = 3, Name = "Insert activities", HoursSpent = 4, ProjectId = 1 });
            context.Activities.Add(new Activity { Id = 4, Name = "Update activities", HoursSpent = 5, ProjectId = 2 });

            context.SaveChanges();
        }

        private static void SeedProjects(ApiContext context) {
            context.Projects.Add(new Project {
                Id = 1,
                Name = "e-conomic Interview",
                Description = "aplicatie timelogger",
                Deadline = new System.DateTime(2022, 04, 30)
            });

            context.Projects.Add(new Project {
                Id = 2,
                Name = "Some interesting project",
                Deadline = new System.DateTime(2022, 04, 01)
            });

            context.SaveChanges();
        }
    }
}
