using System;
using System.Collections.Generic;
using System.Linq;
using Timelogger.Entities;

namespace Timelogger.Validators {
    public class ActivityValidator: IActivityValidator {

        private readonly ApiContext context;
        private List<string> Errors = new List<string>();

        public ActivityValidator(ApiContext context) {
            this.context = context;
        }

        public string Validate(Activity activity) {
            ValidateProject(activity.ProjectId);

            return string.Join("\n", Errors);
        }

        private void ValidateProject(int projectId) {
            var project = context.Projects.Where(p => p.Id == projectId).FirstOrDefault();
            if(project == null) {
                Errors.Add("The project does not exists!");
            } else if(project.Deadline < DateTime.Today) {
                Errors.Add("You cannot update projects and its activities with deadline in the past!");
            }
        }
    }
}
