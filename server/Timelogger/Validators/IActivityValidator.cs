using System;
using System.Collections.Generic;
using System.Text;
using Timelogger.Entities;

namespace Timelogger.Validators {
    public interface IActivityValidator {
        public string Validate(Activity activity);
    }
}
