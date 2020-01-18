using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Gis.Models.DTO;
using GIS.Models.Query;
using GIS.Models.Query.dto;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Formatter.Serialization;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebAPI.Models;
using WebAPI.Models.GisShop;
using WebAPI.Models.ZahraShop;

namespace WebAPI.Controllers.EShop
{


    //[Authorize(Roles = "Admin,SuperAdmin")]
    [Route("api/Produits")]
    [ApiController]
    public class ProduitsController : ControllerBase
    {
        private readonly EshopContext _context;


        public ProduitsController(EshopContext context)
        {
            _context = context;
        }

        //******************************************************************
        //******************************************************************
        //Get all Products
        //******************************************************************
        //******************************************************************

        // GET: api/Produits
        [HttpGet]
        [EnableQuery]
        public async Task<ActionResult<IQueryable<Produit>>> GetProduitsAsync(int? page, int pagesize = 10, string sousCategorie = "", string filter = "",string filterPrix = "desc")
        {
            List<Produit> prods2;
            var caracs = new Dictionary<string, List<string>>();
            var returnedcracs = new List<CaracDto>();
            List<string> brands = new List<string>();
            List<string> filters = new List<string>();

            
            if (string.IsNullOrEmpty(sousCategorie))
            {
               
                    if (filterPrix == "desc")
                    {
                    prods2 = await _context.Produits.Include(x => x.SousCategorie).OrderByDescending(x=>x.Prix).ToListAsync();

                    }
                    else
                    {
                    prods2 = await _context.Produits.Include(x => x.SousCategorie).OrderBy(x => x.Prix).ToListAsync();

                    }
             
                if (!string.IsNullOrEmpty(filter))
                {
                    prods2 = prods2.Where(p => filter.ToLower().Contains(p.Marque.ToLower())).ToList();
                }
            }
            else
            {
                    var caracteristiques = new List<Caracteristique>();
               
                    if (filterPrix == "desc")
                    {
                        prods2 = await _context.Produits.Include(x => x.SousCategorie).Where(x => x.SousCategorie.NsousCategorie.ToLower() == sousCategorie).Include(x => x.Caracteristiques).OrderByDescending(x=>x.Prix).ToListAsync();

                    }
                    else
                    {
                        prods2 = await _context.Produits.Include(x => x.SousCategorie).Where(x => x.SousCategorie.NsousCategorie.ToLower() == sousCategorie).Include(x => x.Caracteristiques).OrderBy(x => x.Prix).ToListAsync();

                    }
           
                prods2.SelectMany(x => x.Caracteristiques).ToList().ForEach(x => caracteristiques.Add(x));

                if (!string.IsNullOrEmpty(filter))
                {
                    prods2 = prods2.Where(p => filter.ToLower().Contains(p.Marque.ToLower())).ToList();
                }

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

                foreach (KeyValuePair<string, List<string>> entry in caracs)
                {
                    returnedcracs.Add(new CaracDto(entry.Key, entry.Value));
                    // do something with entry.Value or entry.Key
                }

            }
          

            var brandys = _context.Produits.Select(x => x.Marque).ToList()
                .Distinct();
            foreach (var item in brandys)
            {
                brands.Add(item);
            }

            var countDetails = prods2.Count();

            var result = new GIS.Models.Query.PageResult<Produit>
            {
                Count = countDetails,
                PageIndex = page ?? 0,
                PageSize = pagesize,
                Items = prods2.Skip((page ?? 0) * pagesize).Take(pagesize).ToList(),
                Brands = brands.ToList(),
                Filters = filters,
                Caracs = returnedcracs
            };

            return Ok(result);
        }

        //******************************************************************
        //******************************************************************
        //search By Specs
        //******************************************************************
        //******************************************************************

        // Post: api/Produits/search/specs
        [HttpPost("search/specs")]
        [EnableQuery]
        public ActionResult<IQueryable<Produit>> SearchProduitsAsyncBySpecs([FromBody]List<SimpleCaracDto> specs , int? page, int pagesize = 10, string sousCategorie = "", string filterPrix = "desc")
        {
            var caracteristiques = new List<Caracteristique>();

            var prods = new HashSet<Produit>();
            if (filterPrix == "desc")
            {
            specs.ForEach(carac =>
            {
                _context.Caracteristique
                                .Include(x => x.Produit)
                                .ThenInclude(x => x.SousCategorie)
                                .OrderByDescending(x=>x.Produit.Prix)
                                .Where(x => x.Produit.SousCategorie.NsousCategorie == sousCategorie)
                                .Where(x => x.Key == carac.Key && x.Value == carac.Value)
                                .Select(x => x.Produit)
                                .ToList()
                                .ForEach(x =>
                                {
                                    if (!prods.Any(p => p.IdProd == x.IdProd))
                                    { prods.Add(x);
                                        
                                    }
                                });
            });

            }
            else
            {
                specs.ForEach(carac =>
                {
                    _context.Caracteristique
                                    .Include(x => x.Produit)
                                    .ThenInclude(x => x.SousCategorie)
                                    .OrderBy(x => x.Produit.Prix)
                                    .Where(x => x.Produit.SousCategorie.NsousCategorie == sousCategorie)
                                    .Where(x => x.Key == carac.Key && x.Value == carac.Value)
                                    .Select(x => x.Produit)
                                    .ToList()
                                    .ForEach(x =>
                                    {
                                        if (!prods.Any(p => p.IdProd == x.IdProd))
                                            prods.Add(x);
                                    });
                });

            }

            var countDetails = prods.Count();

            var result = new GIS.Models.Query.PageResult<Produit>
            {
                Count = countDetails,
                PageIndex = page ?? 0,
                PageSize = pagesize,
                Items = prods.Skip((page ?? 0) * pagesize).Take(pagesize).ToList(),

            };
            return Ok(result);
        }

        //******************************************************************
        //******************************************************************
        //search
        //******************************************************************
        //******************************************************************

        // GET: api/Produits/search
        [HttpGet("search")]
        [EnableQuery]
        public async Task<ActionResult<IQueryable<Produit>>> SearchProduitsAsync(int? page, int pagesize = 10, string filter = "", string filterPrix = "desc")
        {
            List<Produit> prods;
            if (!string.IsNullOrEmpty(filter))
            {
                string cleanfilter = StringCleaner(filter);
                if (filterPrix == "desc")
                {
                    prods = await _context.Produits
                        .OrderByDescending(x => x.Prix)
                        .Include(x => x.SousCategorie)
                        .Where(
                            x => EF.Functions.Like(cleanfilter, (StringCleaner("%" + x.NomProduit + "%")))
                            || EF.Functions.Like(cleanfilter, (StringCleaner("%" + x.SousCategorie.NsousCategorie + "%")))
                            || EF.Functions.Like(cleanfilter, (StringCleaner("%" + x.Marque + "%")))).ToListAsync();
                        }
                else
                {
                    prods = await _context.Produits
                        .OrderBy(x=>x.Prix)
                        .Include(x => x.SousCategorie)
                        .Where(
                            x => EF.Functions.Like(cleanfilter, (StringCleaner("%" + x.NomProduit + "%")))
                            || EF.Functions.Like(cleanfilter, (StringCleaner("%" + x.SousCategorie.NsousCategorie + "%")))
                            || EF.Functions.Like(cleanfilter, (StringCleaner("%" + x.Marque + "%")))).ToListAsync();
                        }
            }
            else
            {
                if (filterPrix == "desc")
                {
                    prods = await _context.Produits.Include(x => x.SousCategorie).OrderByDescending(x => x.Prix).ToListAsync();
                }
                else
                {
                    prods = await _context.Produits.Include(x => x.SousCategorie).OrderBy(x => x.Prix).ToListAsync();
                }

            }


            var countDetails = prods.Count();

            var result = new GIS.Models.Query.PageResult<Produit>
            {
                Count = countDetails,
                PageIndex = page ?? 0,
                PageSize = pagesize,
                Items = prods.Skip((page ?? 0) * pagesize).Take(pagesize).ToList(),
                FilterProdName = filter
            };
            return Ok(result);

        }


        //******************************************************************
        //******************************************************************
        //******************************************************************
        //******************************************************************
        //******************************************************************


        public String StringCleaner(string s)
        {
            return Regex.Replace(s, @"[^a-zA-Z0-9\-]", "").ToLower();
        }


        // GET: api/Produits/5
        [HttpGet("{id}")]
        [EnableQuery]
        public async Task<ActionResult<Produit>> GetProduit(Guid id)
        {
            //var produit = await _context.Produits.Include(p => p.Caracteristiques).Include(p=>p.Images).SingleOrDefaultAsync(p=>p.IdProd==id);
            var produit = await _context.Produits.Select(s => new
            {
                s.IdProd,
                s.NomProduit,
                s.Description,
                s.Prix,
                s.Disponible,
                s.Remise,
                s.Couleur,
                s.Marque,
                s.CreationDate,
                s.IdScat,
                NsousCategorie = s.SousCategorie.NsousCategorie,
                s.Images,
                //FrontImg=s.Images.First<Image>().ImageName,
                FrontImg = s.FrontImg,
                s.Caracteristiques
            }).SingleOrDefaultAsync(p => p.IdProd == id);

            if (produit == null)
            {
                return NotFound();
            }

            return Ok(produit);
        }

        // PUT: api/Produits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduit(Guid id, Produit produit)
        {
            if (id != produit.IdProd)
            {
                return BadRequest();
            }



            _context.Entry(produit).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProduitExists(id))
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

        // POST: api/Produits
        [HttpPost]
        public async Task<ActionResult<Produit>> PostProduit(Produit produit)
        {

            _context.Produits.Add(produit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduit", new { id = produit.IdProd }, produit);
        }

        // DELETE: api/Produits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Produit>> DeleteProduit(Guid id)
        {
            var produit = await _context.Produits.FindAsync(id);
            if (produit == null)
            {
                return NotFound();
            }

            try
            {
                _context.Produits.Remove(produit);
                string path = "wwwroot/uploads/" + id;
                Directory.Delete(path, true);


                await _context.SaveChangesAsync();

                return produit;
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        private bool ProduitExists(Guid id)
        {
            return _context.Produits.Any(e => e.IdProd == id);
        }



    }
}
