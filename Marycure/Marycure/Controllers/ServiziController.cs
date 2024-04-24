using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Marycure.Controllers; // Assicurati che questo namespace sia corretto.
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ServiziController : ControllerBase
{
    private readonly MarycureContext _context;

    public ServiziController(MarycureContext context)
    {
        _context = context;
    }

    // GET: api/Servizi
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Servizio>>> GetServizi()
    {
        try
        {
            return await _context.Servizi.ToListAsync();
        }
        catch (Exception ex)
        {
            // Log dell'eccezione o restituire un messaggio di errore più dettagliato
            return StatusCode(500, ex.Message);
        }
    }
}
