using GameStreamSearch.Api.Infrastructor;
using GameStreamSearch.Providers;
using GameStreamSearch.Services;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders;
using GameStreamSearch.StreamProviders.Builders;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GameStreamSearch.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("allowAll",
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            services.AddControllers();
            services.AddScoped<IPaginator, Paginator>();
            services.AddScoped<IStreamService>(service =>
            {
                return new StreamService(service.GetService<IPaginator>())
                    .RegisterStreamProvider(new TwitchStreamProvider(
                        "Twitch",
                        new TwitchKrakenApi(Configuration["Twitch:Url"], Configuration["Twitch:ClientId"])
                    ))
                    .RegisterStreamProvider(new YouTubeStreamProvider(
                        "YouTube",
                        new YouTubeWatchUrlBuilder(Configuration["YouTube:StreamUrl"]),
                        new YouTubeV3Api(Configuration["YouTube:Url"], Configuration["YouTube:ApiKey"])
                    ));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();

            app.UseCors("allowAll");

            app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "text/plain";

                    await context.Response.WriteAsync("An internal server error has occurred");
                });
            });
        }
    }
}
