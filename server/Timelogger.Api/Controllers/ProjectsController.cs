using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using Timelogger.Services;

namespace Timelogger.Api.Controllers {
    [Route("api/[controller]")]
    public class ProjectsController: Controller {
        private readonly IProjectService projectService;

        public ProjectsController(IProjectService projectService) {
            this.projectService = projectService;
        }

        [HttpGet]
        [Route("hello-world")]
        public string HelloWorld() {
            return "Hello Back!";
        }

        [HttpGet]
        public IActionResult Get() {
            var projects = projectService.GetProjects();
            return Ok(projects);
        }

        [HttpGet]
        [Route("{projectName}/search")]
        public IActionResult Get(string projectName) {
            var projects = projectService.GetProjectByName(projectName);
            return Ok(projects);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id) {
            var project = projectService.GetProjectById(id);
            return Ok(project);
        }

        [HttpGet]
        [Route("{id}/activities")]
        public IActionResult GetActivities(int id) {
            var projects = projectService.GetActivitiesByProjectId(id);
            return Ok(projects);
        }

        [HttpPost]
        public IActionResult Insert(Project project) {
            return Ok(projectService.InsertProject(project));
        }

        [HttpPut]
        public IActionResult Update(Project project) {
            return Ok(projectService.UpdateProject(project));
        }

        [HttpDelete]
        public IActionResult Delete(int id) {
            projectService.DeleteProject(id);
            return Ok();
        }
    }
}
