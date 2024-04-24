using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Marycure.Controllers;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly MarycureContext _context;
    private readonly ILogger<UsersController> _logger;

    public UsersController(MarycureContext context, ILogger<UsersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // POST api/Users/sync
    [HttpPost("sync")]
    [Authorize]
    public async Task<IActionResult> Sync([FromBody] UserDto userDto)
    {
        try
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.ClerkUserId == userDto.ClerkUserId);

            if (user == null)
            {
                // Crea un nuovo utente
                user = new User
                {
                    ClerkUserId = userDto.ClerkUserId,
                    Email = userDto.Email,
                    Nome = userDto.FirstName,
                    Cognome = userDto.LastName,
                    NumTel = userDto.PhoneNumber,
                };

                _context.User.Add(user);
                await _context.SaveChangesAsync();

                // Ritorna l'ID del nuovo utente creato
                return Ok(new { UserID = user.UserID, message = "Nuovo utente creato e sincronizzato con successo" });
            }
            else
            {
                // Aggiorna l'utente esistente
                user.Email = userDto.Email;
                user.Nome = userDto.FirstName;
                user.Cognome = userDto.LastName;
                user.NumTel = userDto.PhoneNumber;

                await _context.SaveChangesAsync();

                // Ritorna l'ID dell'utente esistente
                return Ok(new { UserID = user.UserID, message = "Utente esistente sincronizzato con successo" });
            }
        }
        catch (DbUpdateException dbEx)
        {
            _logger.LogError(dbEx, "Errore di aggiornamento del database durante la sincronizzazione dell'utente.");
            return StatusCode(500, new { message = "Errore di aggiornamento del database", dettaglio = dbEx.InnerException?.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Si è verificato un errore durante la sincronizzazione dell'utente.");
            return StatusCode(500, new { message = "Errore interno del server" });
        }
    }
}
