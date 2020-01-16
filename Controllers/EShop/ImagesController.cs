using System;
using System.Collections.Generic;
using System.IO;
   
using System.Linq;
using System.Threading.Tasks;
using GIS.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.ZahraShop;

namespace WebAPI.Controllers.Eshop
{
    [Route("api/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly EshopContext _context;
        public ImagesController(EshopContext context)
        {
            _context = context ?? throw new Exception();
        }

        [HttpGet]
        //Get : api/images
        public async Task<ICollection<Image>> Get()
        {
            return await _context.Images.ToListAsync();
        }

        [HttpGet("{id}")]
        //Get : api/images/id
        public async Task<ICollection<Image>> GetByProdId(Guid id)
        {
            var prod = await _context.Produits.FindAsync(id);

            return prod.Images.ToList();
        }


        //Post : api/images/produit/id
        [HttpPost("produit/{id}")]
        public async Task<IActionResult> Upload(Guid id)
        {
            try
            {
                if (!Request.HasFormContentType)
                {
                    throw new InvalidOperationException("Incorrect Content-Type: " + Request.ContentType);
                }

                var file = Request.Form.Files[0];
                string path = "wwwroot/uploads/" + id;
                string fullPath = "";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                if (file.Length > 0)
                {
                    fullPath = Path.Combine(path, file.FileName);
                    var stream = new FileStream(fullPath, FileMode.Create);
                    await file.CopyToAsync(stream);
                    stream.Close();
                }
                _context.Images.Add(new Image() { ImageName = "Uploads/" + id + "/" + file.FileName, ProduitId = id });
                await _context.SaveChangesAsync();

                var prod = await _context.Produits.FindAsync(id);
                prod.FrontImg = prod.Images.FirstOrDefault<Image>().ImageName;
                _context.Entry(prod).State = EntityState.Modified;
                await _context.SaveChangesAsync();



              

                return Ok(_context);
            }
            catch (Exception e)
            {
                return Ok("fails execption" + e);
            }
        }

        //Delete : api/images/produit/idprod/filename
        [HttpDelete("produit/{id}/")]
        public IActionResult DeleteImage(Guid id, string filename)
        {
            string path = "wwwroot/uploads/" + id;

            var prod = _context.Produits.Find(id);
            if (prod==null)
            {
                return BadRequest(new { message = "Le dossier de ce produit n'exist pas" });
            }
            return Ok(filename);
        }

        //Put : api/images/produit/FrontImg/id
        //[HttpPost("produit/FrontImg/{id}")]
        [HttpPut("produit/FrontImg/{id}")]
        public async Task<IActionResult> EditFrontImage(Guid id,GenericStringDTO GenericDTO)
        {
            var prod = await _context.Produits.FindAsync(id);
            if (prod.Images == null) {
                return StatusCode(400);
            }
            var image = _context.Images.SingleOrDefault(i => i.IdImage == GenericDTO.GenericGuid);
            if (image!= null)
            {
                prod.FrontImg = image.ImageName;
                _context.Entry(prod).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(prod.FrontImg);
            }
            return StatusCode(400);

        }


        //Put : api/images/produit/updateFrontImg/id
        [HttpPut("produit/updateFrontImg/{id}")]
        public async Task<IActionResult> AfterPostFrontImage(Guid id)
        {
            var prod = await _context.Produits.FindAsync(id);
            if (prod.Images == null)
            {
                return NotFound( new {  message= "Product doesn't have images "});
            }
            var image = prod.Images.FirstOrDefault<Image>();
            if (image != null)
            {
                prod.FrontImg = image.ImageName;
                _context.Entry(prod).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(prod.FrontImg);
            }
            return BadRequest(new { message = "Insertion problem .." });

        }

    }
}