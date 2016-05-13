using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Bogus;

namespace TDC.AspNetCore.Web.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions options)
            : base(options)
        {
        }
 
        public DbSet<Contact> Contacts { get; set; }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasKey(c => c.Id);
        }
    }
    
    public static class ContactContextExtensions
    {
        public static void Seed(this ContactContext context)
        {
            var contacts = new Faker<Contact>("pt_BR")
                .StrictMode(true)
                .RuleFor(c => c.Id, Guid.NewGuid)
                .RuleFor(c => c.Name, f => $"{f.Name.FirstName()} {f.Name.LastName()}")
                .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.Name).ToLower())
                .RuleFor(o => o.Phone, f => f.Phone.PhoneNumber("(##) 9####-####"))
                .Generate(5);
                
            context.Contacts.AddRange(contacts);
 
            context.SaveChanges();
        }
    }
}