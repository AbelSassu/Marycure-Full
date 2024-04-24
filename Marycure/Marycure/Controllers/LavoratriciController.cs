using Marycure.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class LavoratriciController : ControllerBase
{
    private readonly MarycureContext _context;

    public LavoratriciController(MarycureContext context)
    {
        _context = context;
    }

    // GET: api/Lavoratrici
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LavoratriceDto>>> GetLavoratrici()
    {
        var lavoratrici = await _context.Lavoratrici
            .Select(l => new LavoratriceDto
            {
                LavoratriciID = l.LavoratriciID,
                NomeLav = l.NomeLav
            })
            .ToListAsync();

        return lavoratrici;
    }

    // GET: api/Lavoratrici/{id}/Appuntamenti
    [HttpGet("{id}/Appuntamenti")]
    public async Task<ActionResult<IEnumerable<AppuntamentoDto>>> GetAppuntamentiLavoratrice(int id)
    {
        var appuntamenti = await _context.Appuntamenti
            .Where(a => a.LavoratriciID == id)
            .Select(a => new AppuntamentoDto
            {
                AppuntamentoId = a.AppuntamentoId,
                Data = a.Data,
                NomeLavoratrice = a.Lavoratrice.NomeLav,
                NomeServizio = a.Servizio.NomeSer
            })
            .ToListAsync();

        if (!appuntamenti.Any())
        {
            return NotFound();
        }

        return appuntamenti;
    }

    // Qui puoi aggiungere POST, PUT, DELETE ecc. come necessario
}
