using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Marycure.Controllers
{
    [Table("User")]
    public class User
    {
        [Key]
        public int UserID { get; set; } // Chiave primaria, generata automaticamente
        [Required]
        public string ClerkUserId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Cognome { get; set; }
        [Required]
        public string NumTel { get; set; }

    }

    public class UserDto //La classe UserDto sarà utilizzata per passare i dati dall'applicazione frontend al backend.
    {
        [Required]
        public string ClerkUserId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

    }
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
