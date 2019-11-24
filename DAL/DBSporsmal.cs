using System;
using System.ComponentModel.DataAnnotations;

namespace DAL
{
    public class DBSporsmal
    {
        [Key]
        public int SporsmalId { get; set; }
        public DateTime LagtUt { get; set; }
        public string Sporsmal { get; set; }
        public string Kategori { get; set; }
        public string Navn { get; set; }

        public string Epost { get; set; }
        
        
    }
}