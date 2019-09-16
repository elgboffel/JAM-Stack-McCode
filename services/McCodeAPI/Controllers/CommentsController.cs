using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using McCodeAPI.Data;
using McCodeAPI.Models.Domain;

namespace McCodeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : Controller
    {
        private readonly McCodeAPIContext _context;

        public CommentsController(McCodeAPIContext context)
        {
            _context = context;
        }

        // GET: comments
        //public async Task<ActionResult<IEnumerable<Comment>>> Index()
        //{
        //    var context = _context.Comments.Include(q => q.Text);
        //    return await context.ToListAsync();
        //}

        //// GET: comments/create
        //public IActionResult Create(int datoCmsId)
        //{
            
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult<string>> Create([Bind("DatoCmsId,author,text")] Comment comment)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(comment);
        //         await _context.SaveChangesAsync();
        //         return "Success";
        //    }

        //    return "Error";
        //    //ViewData["SamuraiId"] = new SelectList(_context.Samurais, "Id", "Id", quote.SamuraiId);
        //    // return RedirectToAction("Details", "Samurais", new { id = quote.SamuraiId});
        //}

        // GET: Quotes/Edit/5
        // public async Task<IActionResult> Edit(int? id)
        // {
        //     if (id == null)
        //     {
        //         return NotFound();
        //     }
        //     var quote = await _context.Quotes.SingleOrDefaultAsync(m => m.Id == id);
        //     if (quote == null)
        //     {
        //         return NotFound();
        //     }
        //     ViewData["SamuraiId"] = new SelectList(_context.Samurais, "Id", "Name", quote.SamuraiId);
        //     return View(quote); 

        // }

        // [HttpPost]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> Edit(int id, [Bind("Id,Text,SamuraiId")] Quote quote) {
        //     if (id != quote.Id) {
        //         return NotFound();
        //     }
        //     if (ModelState.IsValid) {
        //         try {
        //             _context.Update(quote);
        //             await _context.SaveChangesAsync();
        //         }
        //         catch (DbUpdateConcurrencyException) {
        //             if (!QuoteExists(quote.Id)) {
        //                 return NotFound();
        //             }
        //             else { throw; }
        //         }
        //         return RedirectToAction("Details", "Samurais", new { id = quote.SamuraiId });
        //     }
        //     ViewData["SamuraiId"] = new SelectList(_context.Samurais, "Id", "Id", quote.SamuraiId);
        //     return RedirectToAction("Details", "Samurais", new { id = quote.SamuraiId });
        // }

        // // GET: Quotes/Delete/5
        // public async Task<IActionResult> Delete(int? id)
        // {
        //     if (id == null)
        //     {
        //         return NotFound();
        //     }

        //     var quote = await _context.Quotes
        //         .Include(q => q.Samurai)
        //         .SingleOrDefaultAsync(m => m.Id == id);
        //     if (quote == null)
        //     {
        //         return NotFound();
        //     }

        //     return View(quote);
        // }

        // // POST: Quotes/Delete/5
        // [HttpPost, ActionName("Delete")]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> DeleteConfirmed(int id)
        // {
        //     var quote = await _context.Quotes.SingleOrDefaultAsync(m => m.Id == id);
        //     _context.Quotes.Remove(quote);
        //     await _context.SaveChangesAsync();
        //     return RedirectToAction(nameof(Index));
        // }

        // private bool QuoteExists(int id)
        // {
        //     return _context.Quotes.Any(e => e.Id == id);
        // }
    }
}
