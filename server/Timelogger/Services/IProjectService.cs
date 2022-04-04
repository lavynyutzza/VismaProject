using System.Collections.Generic;
using Timelogger.Entities;

namespace Timelogger.Services {
    public interface IProjectService {
        List<Project> GetProjects();
        List<Project> GetProjectByName(string name);
        Project GetProjectById(int id);
        List<Activity> GetActivitiesByProjectId(int id);
        Project InsertProject (Project project);
        Project UpdateProject (Project project);
        void DeleteProject (int id);
    }
}
