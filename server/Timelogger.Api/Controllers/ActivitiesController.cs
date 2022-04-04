using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Insert(Activity activity) {
            return Ok(activityService.InsertActivity(activity));
        }

        [HttpPut]
        public IActionResult Update(Activity activity) {
            return Ok(activityService.UpdateActivity(activity));
        }

        [HttpDelete]
        public IActionResult Delete(int id) {
            activityService.DeleteActivity(id);
            return Ok();
        }
    }
}
