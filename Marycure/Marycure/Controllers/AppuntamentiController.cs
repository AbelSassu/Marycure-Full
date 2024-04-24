using Marycure.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AppuntamentiController : ControllerBase
{
    private readonly MarycureContext _context;

    public AppuntamentiController(MarycureContext context)
    {
        _context = context;
    }

    // GET: api/Appuntamenti/Lavoratrici
    [HttpGet("Lavoratrici")]
    public async Task<ActionResult<IEnumerable<Lavoratrice>>> GetLavoratrici()
    {
        return await _context.Lavoratrici.ToListAsync();
    }

    [HttpGet("OrariDisponibili")]
    public async Task<ActionResult<IEnumerable<object>>> GetOrariDisponibili([FromQuery] DateTime data, [FromQuery] int? lavoratriceId, [FromQuery] int[] servizioIds)
    {
        // Controlli iniziali per giorno di chiusura e prenotazione nel passato.
        if (data.DayOfWeek == DayOfWeek.Sunday || data.DayOfWeek == DayOfWeek.Monday)
        {
            return BadRequest("Chiusura salone");
        }
        if (data.Date < DateTime.Now.Date)
        {
            return BadRequest("Non si può prenotare nel passato.");
        }

        // Verifica che tutti i servizi richiesti esistano.
        var serviziRichiesti = await _context.Servizi
            .Where(s => servizioIds.Contains(s.ServiziID))
            .ToListAsync();

        if (serviziRichiesti.Count != servizioIds.Length)
        {
            return BadRequest("Uno o più servizi non trovati.");
        }

        // Calcola la durata totale dei servizi richiesti.
        var durataTotale = TimeSpan.FromMinutes(serviziRichiesti.Sum(s => s.Durata.TotalMinutes));

        // Recupera gli orari di lavoro per il giorno specificato.
        var orariDiLavoro = GetOrariDiLavoro(data.DayOfWeek);

        // Preparazione della lista per gli slot disponibili.
        var slotDisponibili = new List<object>();

        // Se non viene fornito un ID lavoratrice, cerca per tutte le lavoratrici.
        if (!lavoratriceId.HasValue || lavoratriceId == 0)
        {
            var tutteLeLavoratrici = await _context.Lavoratrici.ToListAsync();

            // Calcolo degli slot per ogni lavoratrice.
            foreach (var lavoratrice in tutteLeLavoratrici)
            {
                var appuntamenti = await _context.Appuntamenti
                    .Include(a => a.Servizio)
                    .Where(a => a.Data.Date == data.Date && a.LavoratriciID == lavoratrice.LavoratriciID)
                    .ToListAsync();

                var slotPerLavoratrice = CalcolaSlotDisponibili(data, orariDiLavoro, appuntamenti, durataTotale, lavoratrice.LavoratriciID);

                // Aggiunta degli slot disponibili alla lista, includendo l'ID e il nome della lavoratrice.
                slotDisponibili.AddRange(slotPerLavoratrice.Select(slot => new
                {
                    LavoratriceId = slot.LavoratriceId,
                    Lavoratrice = lavoratrice.NomeLav,
                    Orario = slot.Orario.ToString("o") // ISO 8601 format.
                }));
            }
        }
        else
        {
            // Calcolo degli slot per la lavoratrice specificata.
            var appuntamenti = await _context.Appuntamenti
                .Include(a => a.Servizio)
                .Where(a => a.Data.Date == data.Date && a.LavoratriciID == lavoratriceId.Value)
                .ToListAsync();

            var slotPerLavoratrice = CalcolaSlotDisponibili(data, orariDiLavoro, appuntamenti, durataTotale, lavoratriceId.Value);

            // In questo caso, sappiamo che c'è una singola lavoratrice quindi possiamo usare il valore di lavoratriceId.
            var nomeLavoratrice = (await _context.Lavoratrici.FindAsync(lavoratriceId.Value))?.NomeLav;

            // Aggiunta degli slot disponibili alla lista.
            slotDisponibili.AddRange(slotPerLavoratrice.Select(slot => new
            {
                LavoratriceId = slot.LavoratriceId,
                Lavoratrice = nomeLavoratrice,
                Orario = slot.Orario.ToString("o") // ISO 8601 format.
            }));
        }

        // Se non ci sono slot disponibili, restituisce un messaggio di errore.
        if (!slotDisponibili.Any())
        {
            return NotFound(new { Messaggio = "Nessuno slot orario disponibile" });
        }

        // Restituisce gli slot disponibili.
        return Ok(slotDisponibili);
    }


    private List<(DateTime Orario, int LavoratriceId)> CalcolaSlotDisponibili(DateTime data, List<(TimeSpan Start, TimeSpan End)> orariDiLavoro, List<Appuntamento> appuntamenti, TimeSpan durataServizio, int lavoratriceId)
    {
        var slotDisponibili = new List<(DateTime, int)>();
        DateTime now = DateTime.Now;

        foreach (var (start, end) in orariDiLavoro)
        {
            if (start.Hours < 0 || start.Hours > 23 || start.Minutes < 0 || start.Minutes > 59 ||
    end.Hours < 0 || end.Hours > 23 || end.Minutes < 0 || end.Minutes > 59)
            {
                // Log dell'errore o gestione di un'eccezione specifica
                throw new ArgumentOutOfRangeException("I valori dell'orario di lavoro sono fuori dall'intervallo consentito.");
            }
            DateTime oraInizioLavoro = new DateTime(data.Year, data.Month, data.Day, start.Hours, start.Minutes, 0);
            DateTime oraFineLavoro = new DateTime(data.Year, data.Month, data.Day, end.Hours, end.Minutes, 0);

            // Arrotonda l'ora attuale al successivo intervallo di 15 minuti se oggi è la data selezionata.
            DateTime oraInizioDisponibili = oraInizioLavoro;
            if (data.Date == now.Date)
            {
                DateTime oraArrotondata = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute - (now.Minute % 15) + 15, 0);
                oraInizioDisponibili = oraArrotondata > oraInizioLavoro ? oraArrotondata : oraInizioLavoro;
            }

            var oraAttuale = oraInizioDisponibili;
            while (oraAttuale.Add(durataServizio) <= oraFineLavoro)
            {
                if (!appuntamenti.Any(a => oraAttuale < a.Data.Add(a.Servizio.Durata) && a.Data < oraAttuale.Add(durataServizio)))
                {
                    // Aggiungi sia l'orario che l'ID della lavoratrice alla lista
                    slotDisponibili.Add((oraAttuale, lavoratriceId));
                }
                oraAttuale = oraAttuale.AddMinutes(15); // Sposta di 15 minuti per il prossimo slot potenziale
            }
        }

        return slotDisponibili;
    }

    [HttpPost]
    public async Task<IActionResult> CreaAppuntamenti([FromBody] AppuntamentoCreaDto appuntamentoDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var appuntamentiCreati = new List<Appuntamento>();

        foreach (var serviziId in appuntamentoDto.ServiziID)
        {
            var servizio = await _context.Servizi.FindAsync(serviziId);
            if (servizio == null)
            {
                return BadRequest($"Servizio con ID {serviziId} non trovato.");
            }

            var appuntamento = new Appuntamento
            {
                Data = appuntamentoDto.Data,
                LavoratriciID = appuntamentoDto.LavoratriciID,
                UserID = appuntamentoDto.UserID,
                ServiziID = serviziId
            };

            _context.Appuntamenti.Add(appuntamento);
            appuntamentiCreati.Add(appuntamento);

            // Aggiorna la Data per il prossimo appuntamento
            appuntamentoDto.Data = appuntamentoDto.Data.AddMinutes(servizio.Durata.TotalMinutes);
        }

        await _context.SaveChangesAsync();

        // Restituisce tutti gli appuntamenti creati
        return CreatedAtAction(nameof(GetAppuntamenti), new { ids = appuntamentiCreati.Select(a => a.AppuntamentoId) }, appuntamentiCreati);
    }

    // Metodo per ottenere tutti gli appuntamenti (opzionale)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appuntamento>>> GetAppuntamenti([FromQuery] int[] ids)
    {
        var appuntamenti = await _context.Appuntamenti
            .Where(a => ids.Contains(a.AppuntamentoId))
            .ToListAsync();

        if (!appuntamenti.Any())
        {
            return NotFound();
        }

        return appuntamenti;
    }


    private List<(TimeSpan Start, TimeSpan End)> GetOrariDiLavoro(DayOfWeek dayOfWeek)
    {
        // Dichiara gli orari di lavoro
        var orari = new Dictionary<DayOfWeek, List<(TimeSpan, TimeSpan)>>()
        {
            { DayOfWeek.Tuesday, new List<(TimeSpan, TimeSpan)>{ (new TimeSpan(9, 0, 0), new TimeSpan(13, 0, 0)), (new TimeSpan(14, 15, 0), new TimeSpan(19, 0, 0)) } },
            { DayOfWeek.Wednesday, new List<(TimeSpan, TimeSpan)>{ (new TimeSpan(9, 0, 0), new TimeSpan(13, 0, 0)), (new TimeSpan(14, 15, 0), new TimeSpan(19, 0, 0)) } },
            { DayOfWeek.Thursday, new List<(TimeSpan, TimeSpan)>{ (new TimeSpan(9, 0, 0), new TimeSpan(13, 0, 0)), (new TimeSpan(14, 15, 0), new TimeSpan(19, 0, 0)) } },
            { DayOfWeek.Friday, new List<(TimeSpan, TimeSpan)>{ (new TimeSpan(9, 0, 0), new TimeSpan(13, 0, 0)), (new TimeSpan(14, 15, 0), new TimeSpan(19, 0, 0)) } },
            { DayOfWeek.Saturday, new List<(TimeSpan, TimeSpan)>{ (new TimeSpan(9, 0, 0), new TimeSpan(13, 0, 0)) } }
        };

        return orari.TryGetValue(dayOfWeek, out var slots) ? slots : new List<(TimeSpan, TimeSpan)>();
    }

    // GET: api/Appuntamenti/ByUser/5
    [HttpGet("ByUser/{userId}")]
    public async Task<ActionResult<IEnumerable<AppuntamentoDto>>> GetAppuntamentiByUserId(int userId)
    {
        // Recupera tutti gli appuntamenti per l'utente specifico, includendo i dettagli relativi
        // alle lavoratrici e ai servizi associati.
        var appuntamenti = await _context.Appuntamenti
            .Include(a => a.Lavoratrice)
            .Include(a => a.Servizio)
            .Where(a => a.UserID == userId)
            .Select(a => new AppuntamentoDto
            {
                AppuntamentoId = a.AppuntamentoId,
                Data = a.Data,
                NomeLavoratrice = a.Lavoratrice.NomeLav,
                NomeServizio = a.Servizio.NomeSer,
                // Aggiungi altri dettagli come prezzo e durata se necessario
            })
            .OrderBy(a => a.Data) // Potresti voler ordinare gli appuntamenti per data
            .ToListAsync();

        if (!appuntamenti.Any())
        {
            return NotFound();
        }

        return appuntamenti;
    }

    [HttpGet("SessioniByUser/{userId}")]
    public async Task<ActionResult<IEnumerable<AppuntamentoSessioneDto>>> GetAppuntamentiSessioniByUserId(int userId)
    {
        var appuntamenti = await _context.Appuntamenti
            .Include(a => a.Lavoratrice)
            .Include(a => a.Servizio)
            .Where(a => a.UserID == userId)
            .OrderBy(a => a.Data)
            .ToListAsync();

        var sessioni = new List<AppuntamentoSessioneDto>();
        AppuntamentoSessioneDto sessioneCorrente = null;

        foreach (var appuntamento in appuntamenti)
        {
            // Converti la durata in TimeSpan se necessario
            TimeSpan durataServizio = TimeSpan.FromMinutes(appuntamento.Servizio.Durata.TotalMinutes);

            if (sessioneCorrente != null && appuntamento.Data <= sessioneCorrente.DataFine)
            {
                // Aggiungi il servizio alla sessione corrente
                sessioneCorrente.Servizi.Add(appuntamento.Servizio.NomeSer);
                // Aggiorna la data di fine della sessione corrente
                sessioneCorrente.DataFine = appuntamento.Data.Add(durataServizio);
            }
            else
            {
                // Se l'appuntamento non rientra nella sessione corrente, inizia una nuova sessione
                sessioneCorrente = new AppuntamentoSessioneDto
                {
                    DataAppuntamento = appuntamento.Data,
                    NomeLavoratrice = appuntamento.Lavoratrice.NomeLav,
                    Servizi = new List<string> { appuntamento.Servizio.NomeSer },
                    DataFine = appuntamento.Data.Add(durataServizio) // Imposta la data di fine della sessione
                };
                sessioni.Add(sessioneCorrente);
            }
        }

            return sessioni;
    }


    [HttpDelete("SessioniByUser/{userId}/{sessionStart}")]
    public async Task<IActionResult> DeleteAppuntamentiSessione(int userId, DateTime sessionStart)
    {
        var appuntamenti = await _context.Appuntamenti
            .Include(a => a.Lavoratrice)
            .Include(a => a.Servizio)
            .Where(a => a.UserID == userId)
            .OrderBy(a => a.Data)
            .ToListAsync();

        var sessioniDaCancellare = new List<Appuntamento>();
        AppuntamentoSessioneDto sessioneCorrente = null;

        foreach (var appuntamento in appuntamenti)
        {
            TimeSpan durataServizio = TimeSpan.FromMinutes(appuntamento.Servizio.Durata.TotalMinutes);

            if (sessioneCorrente != null && appuntamento.Data <= sessioneCorrente.DataFine)
            {
                sessioniDaCancellare.Add(appuntamento);
                sessioneCorrente.DataFine = appuntamento.Data.Add(durataServizio);
            }
            else if (appuntamento.Data == sessionStart)
            {
                // Identifica la sessione da cancellare
                sessioniDaCancellare.Clear(); // Assicurati che la lista sia vuota
                sessioneCorrente = new AppuntamentoSessioneDto
                {
                    DataAppuntamento = appuntamento.Data,
                    DataFine = appuntamento.Data.Add(durataServizio),
                    NomeLavoratrice = appuntamento.Lavoratrice.NomeLav,
                    Servizi = new List<string> { appuntamento.Servizio.NomeSer }
                };
                sessioniDaCancellare.Add(appuntamento);
            }
            else
            {
                // Resetta la sessione corrente se non è quella da cancellare
                sessioneCorrente = null;
            }
        }

        if (sessioniDaCancellare.Any())
        {
            _context.Appuntamenti.RemoveRange(sessioniDaCancellare);
            await _context.SaveChangesAsync();
            return Ok($"La sessione di appuntamenti iniziata alle {sessionStart} è stata cancellata.");
        }
        else
        {
            return NotFound("Nessuna sessione trovata per l'utente specificato con l'orario di inizio fornito.");
        }
    }




}