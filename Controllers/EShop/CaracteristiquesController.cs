using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gis.Models.DTO;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authorization;
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

        // GET: api/Caracteristiques/reduced
        [HttpGet("reduced")]
        [EnableQuery]
        public async Task<ActionResult<Dictionary<string, List<string>>>> GetReducedCaracteristique(string categorie)
        {
            var caracteristiques = await _context.Caracteristique.ToListAsync();
            var caracs = new Dictionary<string, List<string>>();
           
            caracteristiques.ForEach(c=>
                {
                    if (caracs.Keys.Contains(c.Key))
                    {
                        if (caracs[c.Key] == null)
                            caracs[c.Key] = new List<string>();

                        if (!caracs[c.Key].Contains(c.Value))
                            caracs[c.Key].Add(c.Value);
                    }
                    else
                        caracs.Add(c.Key, new List<string>() { c.Value });
                });
                return Ok(caracs);

        }


        //**********************************************
        //**********************************************

        // GET: api/Caracteristiques/bysouscaterie
        [HttpGet("bysouscaterie")]
        [EnableQuery]
        public async Task<ActionResult<Dictionary<string, List<string>>>> GetReducedCaracteristiqueBySousCateg(Guid sousCategorie)
        {
            var caracteristiques = await _context.Caracteristique
                .Include(x=>x.Produit)
                .ThenInclude(x=>x.SousCategorie)
                .Where(x=>x.Produit.SousCategorie.IdScat==sousCategorie)
                .ToListAsync();
            var caracs = new Dictionary<string, List<string>>();

            caracteristiques.ForEach(c =>
            {
                if (caracs.Keys.Contains(c.Key))
                {
                    if (caracs[c.Key] == null)
                        caracs[c.Key] = new List<string>();

                    if (!caracs[c.Key].Contains(c.Value))
                        caracs[c.Key].Add(c.Value);
                }
                else
                    caracs.Add(c.Key, new List<string>() { c.Value });
            });
            return Ok(caracs);

        }
        //**********************************************
        //**********************************************



        // GET: api/Caracteristiques/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
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
        [Authorize(Roles = "Admin,SuperAdmin")]
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
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<ActionResult<Caracteristique>> PostCaracteristique(Caracteristique caracteristique)
        {
            _context.Caracteristique.Add(caracteristique);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCaracteristique", new { id = caracteristique.IdCarac }, caracteristique);
        }

        // DELETE: api/Caracteristiques/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
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
