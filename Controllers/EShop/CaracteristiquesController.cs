using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.GisShop;

namespace WebAPI.Controllers.EShop
{
    [Route("api/Caracteristiques")]
    [ApiController]
    public class CaracteristiquesController : ControllerBase
    {
        private readonly EshopContext _context;

        public CaracteristiquesController(EshopContext context)
        {
            _context = context;
        }

        // GET: api/Caracteristiques
        [HttpGet]
        [EnableQuery]
        public async Task<ActionResult<IEnumerable<Caracteristique>>> GetCaracteristique()
        {
            return await _context.Caracteristique.ToListAsync();
        }

        // GET: api/Caracteristiques/5
        [HttpGet("{id}")]
        [EnableQuery]
        public async Task<ActionResult<Caracteristique>> GetCaracteristique(Guid id)
        {
            var caracteristique = await _context.Caracteristique.FindAsync(id);

            if (caracteristique == null)
            {
                return NotFound();
            }

            return caracteristique;
        }

        // PUT: api/Caracteristiques/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCaracteristique(Guid id, Caracteristique caracteristique)
        {
            if (id != caracteristique.IdCarac)
            {
                return BadRequest();
            }

            _context.Entry(caracteristique).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaracteristiqueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Caracteristiques
        [HttpPost]
        public async Task<ActionResult<Caracteristique>> PostCaracteristique(Caracteristique caracteristique)
        {
            _context.Caracteristique.Add(caracteristique);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCaracteristique", new { id = caracteristique.IdCarac }, caracteristique);
        }

        // DELETE: api/Caracteristiques/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Caracteristique>> DeleteCaracteristique(Guid id)
        {
            var caracteristique = await _context.Caracteristique.FindAsync(id);
            if (caracteristique == null)
            {
                return NotFound();
            }

            _context.Caracteristique.Remove(caracteristique);
            await _context.SaveChangesAsync();

            return caracteristique;
        }

        private bool CaracteristiqueExists(Guid id)
        {
            return _context.Caracteristique.Any(e => e.IdCarac == id);
        }
    }
}
