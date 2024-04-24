using System.ComponentModel.DataAnnotations;

namespace Marycure.Controllers
{
    public class Lavoratrice
    {
        [Key]
        public int LavoratriciID { get; set; }
        [Required]
        public string NomeLav { get; set; }

        public virtual ICollection<Appuntamento> Appuntamenti { get; set; }
    }

    public class LavoratriceDto
    {
        [Required]
        public int LavoratriciID { get; set; }
        [Required]
        public string NomeLav { get; set; }

    }
}
