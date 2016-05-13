using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TDC.AspNetCore.Web.Models;
 
namespace TDC.AspNetCore.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore().AddJsonFormatters();
            
            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ContactContext>(options => options.UseInMemoryDatabase());
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Debug);
            
            using (var serviceScope = app.ApplicationServices
                      .GetRequiredService<IServiceScopeFactory>()
                      .CreateScope())
            {
                serviceScope.ServiceProvider
                    .GetService<ContactContext>().Seed();
            }
            
            app.UseRuntimeInfoPage();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
