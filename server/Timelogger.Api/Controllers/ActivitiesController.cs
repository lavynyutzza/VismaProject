using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Timelogger.Entities;
using Timelogger.Services;

namespace Timelogger.Api.Controllers {

    [Route("api/[controller]")]
    public class ActivitiesController: Controller {

		private readonly IActivityService activityService;

		public ActivitiesController(IActivityService activityService) {
			this.activityService = activityService;
		}

        [HttpGet]
        public IActionResult Get() {
            var activities = activityService.GetActivities();
            return Ok(activities);
        }

        [HttpGet]
        [Route("{activityName}/search")]
        public IActionResult Get(string activityName) {
            var activities = activityService.GetActivityByName(activityName);
            return Ok(activities);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id) {
            var activity = activityService.GetActivityById(id);
            return Ok(activity);
        }

        [HttpPost]
        public IActionResult Insert([FromBody] Activity activity) {
            try {
                var errorMessage = string.Empty;
                if(!ModelState.IsValid) {
                    errorMessage = string.Join("\n", ModelState.Values
                                        .SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage));
                }

                if(!string.IsNullOrWhiteSpace(errorMessage)) {
                    return BadRequest(errorMessage);
                }

                return Ok(activityService.InsertActivity(activity));
            } catch(Exception ex) {
                return new UnprocessableEntityObjectResult(ex.ToString());
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] Activity activity) {
            try {
                var errorMessage = string.Empty;
                if(!ModelState.IsValid) {
                    errorMessage = string.Join("\n", ModelState.Values
                                        .SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage));
                }

                if(!string.IsNullOrWhiteSpace(errorMessage)) {
                    return BadRequest(errorMessage);
                }

                return Ok(activityService.UpdateActivity(activity));

            } catch(Exception ex) {
                return new UnprocessableEntityObjectResult(ex.ToString());
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) {
            try {
                activityService.DeleteActivity(id);
                return Ok();
            } catch(Exception ex) {
                return new UnprocessableEntityObjectResult(ex.ToString());
            }
        }
    }
}
