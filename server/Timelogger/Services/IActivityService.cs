using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Services {
    public interface IActivityService {
        List<Activity> GetActivities();
        List<Activity> GetActivityByName(string name);
        Activity GetActivityById(int id);
        Activity InsertActivity(Activity project);
        Activity UpdateActivity(Activity project);
        void DeleteActivity(int id);
    }
}
