using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TDC.AspNetCore.Web.Models;

namespace TDC.AspNetCore.Web.Controllers
{
    [Route("/api/contacts")]
    public class ContactController
    {
        private readonly ContactContext _context;
        
        public ContactController(ContactContext context)
        {
            this._context = context;
        }
        
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _context.Contacts.ToList();
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var contact = _context.Contacts.First(c => c.Id == id);
            if (contact == null)
            {
                return new NotFoundResult();
            }
            return new OkObjectResult(contact);
        }
        
        [HttpPost]
        public void Post([FromBody]Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]Contact contact)
        {
            var contactDb = _context.Contacts.First(c => c.Id == id);
            contactDb.Name = contact.Name;
            contactDb.Email = contact.Email;
            contactDb.Phone = contact.Phone;

            _context.SaveChanges();
        }
        
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            var contact = _context.Contacts.First(c => c.Id == id);
            
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
        }
    }
}