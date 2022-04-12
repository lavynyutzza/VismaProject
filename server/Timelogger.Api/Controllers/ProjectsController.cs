using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Timelogger.Entities;
using Timelogger.Services;
using Timelogger.Validators;

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
        public IActionResult Insert([FromBody] Project project) {
            try {
                var errorMessage = string.Empty;
                if(!ModelState.IsValid) {
                    errorMessage = string.Join("\n", ModelState.Values
                                        .SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage));
                }

                errorMessage += "\n" + ProjectValidator.Validate(project);

                if(!string.IsNullOrWhiteSpace(errorMessage)) {
                    return BadRequest(errorMessage);
                }

                return Ok(projectService.InsertProject(project));
            } catch(Exception ex) {
                return new UnprocessableEntityObjectResult(ex.ToString());
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] Project project) {
            try {
                var errorMessage = string.Empty;
                if(!ModelState.IsValid) {
                    errorMessage = string.Join("\n", ModelState.Values
                                        .SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage));


                }
                errorMessage += "\n" + ProjectValidator.Validate(project);

                if(!string.IsNullOrWhiteSpace(errorMessage)) {
                    return BadRequest(errorMessage);
                }
                return Ok(projectService.UpdateProject(project));

            } catch(Exception ex) {
                return new UnprocessableEntityObjectResult(ex.ToString());
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) {
            try {
                projectService.DeleteProject(id);
                return Ok();
            } catch(Exception ex) {
                return new UnprocessableEntityObjectResult(ex.ToString());
            }
        }
    }
}
