using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;

namespace TDC.AspNetCore.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello TDC Floripa 2016!");
            Console.WriteLine(System.Runtime.InteropServices.RuntimeInformation.OSDescription);
            
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();
                
            host.Run();
        }
    }
}
