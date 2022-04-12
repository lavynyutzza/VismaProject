using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Timelogger.Services;
using Timelogger.Validators;

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
            services.AddTransient<IProjectValidator, ProjectValidator>();
            services.AddTransient<IActivityValidator, ActivityValidator>();


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
            Database.SeedDatabase(context);
        }
    }
}