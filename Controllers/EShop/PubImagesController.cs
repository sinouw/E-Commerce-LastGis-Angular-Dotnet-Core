using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GIS.Models.GisShop;
using WebAPI.Models;
using System.IO;

namespace GIS.Controllers.EShop
{
    [Route("api/PubImages")]
    [ApiController]
    public class PubImagesController : ControllerBase
    {
        private readonly EshopContext _context;

        public PubImagesController(EshopContext context)
        {
            _context = context;
        }

        // GET: api/PubImages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pub>>> GetPubsImages()
        {
            return await _context.PubsImages.ToListAsync();
        }

     
        // POST: api/PubImages
        [HttpPost]
        public async Task<ActionResult<Pub>> PostPub()
        {
            

            try
            {
                Guid id = Guid.NewGuid();
                var file = Request.Form.Files[0];
                string path = "wwwroot/uploads/PubImages/"+id;
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
                }
                _context.PubsImages.Add(new Pub() { IdIPubImage= id , PubImageName = "Uploads/PubImages/" +id +"/"+ file.FileName});
                await _context.SaveChangesAsync();
                return Ok(_context);
            }
            catch (Exception e)
            {
                return Ok("fails execption" + e);
            }
        }

        // DELETE: api/PubImages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Pub>> DeletePub(Guid id)
        {
            var pub = await _context.PubsImages.FindAsync(id);
            if (pub == null)
            {
                return NotFound();
            }

            try
            {
            _context.PubsImages.Remove(pub);
            string path = "wwwroot/uploads/PubImages/"+id;
                System.GC.Collect();
                System.GC.WaitForPendingFinalizers();
                Directory.Delete(path, true);


            await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return pub;
        }



        private bool PubExists(Guid id)
        {
            return _context.PubsImages.Any(e => e.IdIPubImage == id);
        }
    }
}
