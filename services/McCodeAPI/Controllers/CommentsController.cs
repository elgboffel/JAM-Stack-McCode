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

        // GET api/comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> Index()
        {
            var context = _context.Comments;

            return await context.ToListAsync();
        }

        // POST api/comments
        [HttpPost]
        public async Task<ActionResult<string>> Create([Bind("DatoCmsId,author,text")] Comment comment)
        {
            if (!ModelState.IsValid) return "Error";

            comment.CreateDate = DateTime.Now;
            _context.Add(comment);
            await _context.SaveChangesAsync();

            return "Success";
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(x => x.Id == id);
        }
    }
}
