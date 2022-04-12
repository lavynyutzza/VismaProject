using System;
using System.Collections.Generic;
using System.Linq;
using Timelogger.Entities;

namespace Timelogger.Services {
    public class ProjectService: IProjectService {
        private readonly ApiContext context;

        public ProjectService(ApiContext context) {
            this.context = context;
        }

        public Project GetProjectById(int id) {
            return context.Projects.Where(p => p.Id == id).FirstOrDefault();
        }

        public List<Project> GetProjectByName(string name) {
            return context.Projects.Where(p => p.Name.ToLower().Contains(name.ToLower())).ToList();
        }

        public List<Project> GetProjects() {
            return context.Projects.ToList();
        }

        public List<Activity> GetActivitiesByProjectId(int id) {
            return context.Activities.Where(p => p.ProjectId == id).ToList();
        }

        public Project InsertProject(Project project) {
            var result = context.Projects.Add(project);
            context.SaveChanges();
            return result.Entity;
        }

        public Project UpdateProject(Project project) {
            var result = context.Projects.Update(project);
            context.SaveChanges();
            return result.Entity;
        }

        public void DeleteProject(int id) {
            if(context.Projects.Any(p => p.Id == id)) {
                context.Activities.RemoveRange(context.Activities.Where(a => a.ProjectId == id));
                context.Projects.Remove(context.Projects.First(x => x.Id == id));
                context.SaveChanges();
            }
        }
    }
}
