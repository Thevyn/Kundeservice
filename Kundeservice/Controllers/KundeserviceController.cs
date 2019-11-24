using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace Kundeservice.Controllers
{
    [Route("api/[controller]")]
    public class KundeserviceController : Controller
    {
        private readonly DB _db;

        public KundeserviceController(DB db)
        {
            _db = db;
        }
        
        [HttpGet("[action]")]
        public List<BrukerSporsmal> HentAlleSporsmal()
        {
            var listeSporsmal = _db.FAQ.ToList();
            var returListe = new List<BrukerSporsmal>();
            foreach (var sporsmal in listeSporsmal)
            {
                var brukerSporsmal = new BrukerSporsmal();
                
                    brukerSporsmal.ID = sporsmal.FId;
                    brukerSporsmal.Sporsmal = sporsmal.Sporsmal;
                    brukerSporsmal.Svar = sporsmal.SvarSpm;
                    brukerSporsmal.PositivRating = sporsmal.PositivRating;
                    brukerSporsmal.NegativRating = sporsmal.NegativRating;

                
                returListe.Add(brukerSporsmal);

            }

            return returListe;
        }
        
        [HttpGet("[action]")]
        public List<BrukerSporsmal> HentKategoriSporsmal(string kategori)
        {
            var listeSporsmal = _db.FAQ.Where(s => s.Kategori == kategori);
            var returListe = new List<BrukerSporsmal>();
            foreach (var sporsmal in listeSporsmal)
            {
                var brukerSporsmal = new BrukerSporsmal();
                
                brukerSporsmal.ID = sporsmal.FId;
                brukerSporsmal.Sporsmal = sporsmal.Sporsmal;
                brukerSporsmal.Svar = sporsmal.SvarSpm;
                brukerSporsmal.PositivRating = sporsmal.PositivRating;
                brukerSporsmal.NegativRating = sporsmal.NegativRating;
                
                returListe.Add(brukerSporsmal);
            }
            return returListe;
        }
        
        [HttpGet("[action]")]
        public List<BrukerSporsmal> HentInnsendteSporsmal()
        {
            var listeSporsmal = _db.Sporsmals.ToList();
            var returListe = new List<BrukerSporsmal>();
            foreach (var sporsmal in listeSporsmal)
            {
                var brukerSporsmal = new BrukerSporsmal();
                
                brukerSporsmal.ID = sporsmal.SporsmalId;
                brukerSporsmal.Sporsmal = sporsmal.Sporsmal;
                brukerSporsmal.Kategori = sporsmal.Kategori;
                brukerSporsmal.Navn = sporsmal.Navn;
                brukerSporsmal.Epost = sporsmal.Epost;
                
                returListe.Add(brukerSporsmal);
            }
            return returListe;
        }

        [HttpPost("[action]")]
        public IActionResult EndreRating([FromBody] RatingModel rating)
        {
            var dbSporsmal = _db.FAQ.FirstOrDefault(s => s.FId == rating.ID);
            if(dbSporsmal != null)
            {
                if(rating.Rating)
                {
                    dbSporsmal.PositivRating += 1;
                    _db.SaveChanges();
                    return StatusCode(200);
                }

                dbSporsmal.NegativRating -=1;
                _db.SaveChanges();
                return StatusCode(200);
            }
            return StatusCode(500);

        }
        
        [HttpPost("[action]")]
        public IActionResult PostSporsmal([FromBody] DBSporsmal brukerSporsmal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(brukerSporsmal != null)
            {
                var nySporsmal = new DBSporsmal()
                {
                    LagtUt = DateTime.Now,
                    Sporsmal = brukerSporsmal.Sporsmal,
                    Navn = brukerSporsmal.Navn,
                    Kategori = brukerSporsmal.Kategori,
                    Epost = brukerSporsmal.Epost
                };
                _db.Sporsmals.Add(nySporsmal);
                _db.SaveChanges();
                return StatusCode(200);
            }
            return StatusCode(500);

        }
        
        [HttpPost("[action]")]
        public IActionResult PostSvar([FromBody] SvarSporsmal svarSporsmal)
        {
            var slettSporsmal = _db.Sporsmals.FirstOrDefault(s => s.SporsmalId == svarSporsmal.ID);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (svarSporsmal != null)
            {
                var nyttSporsmal = new DBFAQ()
                {
                    Sporsmal = svarSporsmal.Sporsmal,
                    SvarSpm = svarSporsmal.Svar,
                    Kategori = svarSporsmal.Kategori,
                    PositivRating = 0,
                    NegativRating = 0,
                    Svart = DateTime.Now
                };

                
               
                    _db.FAQ.Add(nyttSporsmal);
                    _db.Sporsmals.Remove(slettSporsmal);
                    _db.SaveChanges();
                    return StatusCode(200);
                    
            }
            return StatusCode(500);
        }
        
        [HttpDelete("{id}")]
        public ActionResult SlettSporsmal([FromRoute] int id)
        {
            var funnetSpm = _db.Sporsmals.FirstOrDefault(s => s.SporsmalId == id);
            if(funnetSpm != null)
            {
                _db.Sporsmals.Remove(funnetSpm);
                _db.SaveChanges();
                return StatusCode(200);

            }
            return StatusCode(500);
        }

    }
    
}