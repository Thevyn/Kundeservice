using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class BrukerSporsmal
    {
        public int ID { get; set; }

        [Required]
        [RegularExpression(@"^[A-Za-zæøåÆØÅ\- ]+$", ErrorMessage = "Fornavn er ikke gyldig. Kan bare være bokstaver")]
        public string Navn { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(@"^[A-Za-zæøåÆØÅ0-9_\-,\. ]+@[a-zA-Z0-9]+\.[a-zA-Z]+$", ErrorMessage = "Eposten er ikke gyldig")]
        public string Epost { get; set; }
        [Required]
        public string Kategori { get; set; }
        [Required]
        public string Sporsmal { get; set; }

        public string Svar { get; set; }

        public int PositivRating { get; set; }
        public int NegativRating { get; set; }
    }
}