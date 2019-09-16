
using System;

namespace McCodeAPI.Models.Domain
{
    public class Comment
    {
        public int Id { get; set; }

        public int DatoCMSId { get; set; }

        public DateTime CreateDate { get; set; }

        public string Author { get; set; }

        public string Text { get; set; }
    }
}
