using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Marycure.Controllers
{
    public class Appuntamento
    {
        [Key]
        public int AppuntamentoId { get; set; }
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public int LavoratriciID { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int ServiziID { get; set; }

        [ForeignKey("LavoratriciID")]
        public virtual Lavoratrice Lavoratrice { get; set; }
        [ForeignKey("UserID")]
        public virtual User User { get; set; }
        [ForeignKey("ServiziID")]
        public virtual Servizio Servizio { get; set; }
    }

    public class AppuntamentoDto
    {
        [Required]
        public int AppuntamentoId { get; set; }
        [Required]
        public DateTime Data { get; set; }
        // Assumendo che tu voglia esporre il nome della lavoratrice e del servizio, ma non le relazioni complete
        [Required]
        public string NomeLavoratrice { get; set; }
        [Required]
        public string NomeServizio { get; set; }
    }

    public class AppuntamentoCreaDto
    {
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public int LavoratriciID { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int[] ServiziID { get; set; }
    }
    public class AppuntamentoSessioneDto
    {
        public DateTime DataAppuntamento { get; set; }
        public DateTime DataFine { get; set; }
        public string NomeLavoratrice { get; set; }
        public List<string> Servizi { get; set; }
    }
    public class AppuntamentoUpdateDto
    {
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public int LavoratriciID { get; set; }
        [Required]
        public int ServiziID { get; set; }
    }
}