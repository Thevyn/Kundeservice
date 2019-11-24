using System;
using System.ComponentModel.DataAnnotations;

namespace DAL
{
    public class DBFAQ
    {
        [Key]
        public int FId { get; set; }
        public DateTime LagtUt { get; set; }
        public string Sporsmal { get; set; }
        public int PositivRating {get; set;}
        public int NegativRating {get; set;}
        public string Kategori { get; set; }
        public DateTime Svart { get; set; }
        public string SvartAv { get; set; }
        public string SvarSpm { get; set; }

    }
}