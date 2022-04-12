using System;
using System.Collections.Generic;
using System.Text;
using Timelogger.Entities;

namespace Timelogger.Validators {
    public class ProjectValidator {
        public static string Validate(Project project) {
            if(project.Deadline < DateTime.Now) {
                return "The deadline cannot be in the past!";
            }
            return null;
        }
    }
}
