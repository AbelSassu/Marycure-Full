using Marycure.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Registra il servizio JWKS e aggiungi il caching alla memoria
var jwksUrl = "https://humble-grouper-65.clerk.accounts.dev/.well-known/jwks.json";
builder.Services.AddSingleton<IJwksService>(sp => new JwksService(sp.GetRequiredService<IMemoryCache>(), jwksUrl));
builder.Services.AddMemoryCache();


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Aggiungi qui il servizio per Entity Framework Core
builder.Services.AddDbContext<MarycureContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173", "https://localhost:5173")
                            .AllowAnyMethod()
                            .AllowAnyHeader());
});


// Configurazione dell'autenticazione JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = "https://humble-grouper-65.clerk.accounts.dev";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true, 
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine("Authentication failed: " + context.Exception.Message);
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("Token validated: " + context.SecurityToken);
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

// Pre-carica e memorizza in cache le chiavi JWKS all'avvio dell'applicazione
var jwksService = app.Services.GetRequiredService<IJwksService>();
var keys = await jwksService.GetSigningKeysAsync();
app.Services.GetRequiredService<IMemoryCache>().Set("jwks-signing-keys", keys, TimeSpan.FromHours(24));



var authOptions = app.Services.GetRequiredService<IOptions<JwtBearerOptions>>();
var jwtBearerOptions = authOptions.Value;
jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidateAudience = false,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = "https://humble-grouper-65.clerk.accounts.dev",
    IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) =>
    {
        // Recupera le chiavi JWKS dalla cache in-memory
        var memoryCache = app.Services.GetRequiredService<IMemoryCache>();
        return memoryCache.Get<SecurityKey[]>("jwks-signing-keys") ?? Array.Empty<SecurityKey>();
    }
};
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();




app.MapControllers();

app.Run();
