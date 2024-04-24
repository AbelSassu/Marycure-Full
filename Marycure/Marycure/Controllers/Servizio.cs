using System.ComponentModel.DataAnnotations;

public class Servizio
{
    [Key]
    public int ServiziID { get; set; }

    [Required]
    public string NomeSer { get; set; }

    [Required] 
    public decimal Prezzo { get; set; }

    [Required]
    public TimeSpan Durata { get; set; }

    public string Dettagli { get; set; }
}
