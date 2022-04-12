using System;
using Timelogger.Entities;

namespace Timelogger.Validators {
    public class ProjectValidator: IProjectValidator {
        public string Validate(Project project) {
            if(project.Deadline < DateTime.Today) {
                return "The deadline cannot be in the past!";
            }
            return null;
        }
    }
}
