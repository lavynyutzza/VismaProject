using System;
using System.Collections.Generic;
using System.Text;
using Timelogger.Entities;

namespace Timelogger.Validators {
    public interface IProjectValidator {
        public string Validate(Project project);
    }
}
