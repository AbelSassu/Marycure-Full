using System.Net.Http.Headers;

namespace Marycure.Controllers
{
    public class Test
    {
        static async Task Main(string[] args)
        {
            // Il tuo endpoint protetto JWT che vuoi testare
            var protectedResourceUrl = "https://localhost:7225/api/Users/sync";

            // Il token JWT valido che intendi testare
            var jwtToken = "your_jwt_token_here";

            using var httpClient = new HttpClient();

            try
            {
                // Imposta l'header di autorizzazione con il token JWT
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);

                // Invia una richiesta GET al tuo endpoint protetto
                var response = await httpClient.GetAsync(protectedResourceUrl);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Success! The JWT is valid and the protected resource was accessed.");
                    // Qui puoi fare altre operazioni con la risposta, come leggere il contenuto se necessario.
                }
                else
                {
                    Console.WriteLine($"Failed with status code: {response.StatusCode}");
                    // Qui puoi gestire la risposta per i casi di fallimento.
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred: {ex.Message}");
                // Gestisci eventuali eccezioni qui.
            }
        }
    }
}
