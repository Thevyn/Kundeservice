using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class SvarSporsmal
    {
        public int ID { get; set; }
        [Required]
        public string Sporsmal { get; set; }
        [Required]
        public string Svar { get; set;}
        
        public string Kategori { get; set; }
    }
}