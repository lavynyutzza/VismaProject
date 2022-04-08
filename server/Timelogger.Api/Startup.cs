using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;
using Microsoft.OpenApi.Models;
using Timelogger.Services;

namespace Timelogger.Api {
    public class Startup {
        private readonly IWebHostEnvironment _environment;
        public IConfigurationRoot Configuration { get; }

        public Startup(IWebHostEnvironment env) {
            _environment = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            // Add framework services.
            services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
            services.AddTransient<IProjectService, ProjectService>();
            services.AddTransient<IActivityService, ActivityService>();


            services.AddLogging(builder => {
                builder.AddConsole();
                builder.AddDebug();
            });

            services.AddMvc(options => options.EnableEndpointRouting = false);

            if(_environment.IsDevelopment()) {
                services.AddCors();
            }

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo {
                    Title = "Timelogger API",
                    Version = "v1"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if(env.IsDevelopment()) {
                app.UseCors(builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());
            }

            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TimeLogger API V1");
                c.RoutePrefix = string.Empty;
            });

            var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
            using(var scope = serviceScopeFactory.CreateScope()) {
                SeedDatabase(scope);
            }
        }

        private static void SeedDatabase(IServiceScope scope) {
            var context = scope.ServiceProvider.GetService<ApiContext>();

            var activity1 = new Activity { Id = 1, Name = "TestActivity1", HoursSpent = 2, ProjectId = 1 };
            var activity2 = new Activity { Id = 2, Name = "TestActivity2", HoursSpent = 3, ProjectId = 1 };
            var activity3 = new Activity { Id = 3, Name = "TestActivity3", HoursSpent = 4, ProjectId = 2 };
            var activity4 = new Activity { Id = 4, Name = "TestActivity4", HoursSpent = 5, ProjectId = 2 };

            var testProject1 = new Project {
                Id = 1,
                Name = "e-conomic Interview",
                Description = "aplicatie timelogger",
                Deadline = new System.DateTime(2022, 04, 15)
            };

            var testProject2 = new Project {
                Id = 2,
                Name = "bla-bla",
                Deadline = new System.DateTime(2022, 04, 01)
            };

            context.Projects.Add(testProject1);
            context.Projects.Add(testProject2);

            context.Activities.Add(activity1);
            context.Activities.Add(activity2);
            context.Activities.Add(activity3);
            context.Activities.Add(activity4);

            context.SaveChanges();
        }
    }
}