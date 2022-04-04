using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Timelogger.Entities;

namespace Timelogger.Services {
    public class ActivityService: IActivityService {

        private readonly ApiContext context;

        public ActivityService(ApiContext context) {
            this.context = context;
        }
        public Activity GetActivityById(int id) {
            return context.Activities.Where(p => p.Id == id).FirstOrDefault();
        }

        public List<Activity> GetActivityByName(string name) {
            return context.Activities.Where(p => p.Name.ToLower().Contains(name.ToLower())).ToList();
        }

        public List<Activity> GetActivities() {
            return context.Activities.ToList();
        }

        public Activity InsertActivity(Activity activity) {
            var result = context.Activities.Add(activity);
            context.SaveChanges();
            return result.Entity;
        }

        public Activity UpdateActivity(Activity activity) {
            var result = context.Activities.Update(activity);
            context.SaveChanges();
            return result.Entity;
        }

        public void DeleteActivity(int id) {
            if(context.Activities.Any(p => p.Id == id)) {
                context.Activities.Remove(context.Activities.First(x => x.Id == id));
                context.SaveChanges();
            }
        }
    }
}
