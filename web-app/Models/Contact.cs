using System;

namespace TDC.AspNetCore.Web.Models
{
    public class Contact
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public string Email { get; set; }
        
        public string Phone { get; set; }
    }
}