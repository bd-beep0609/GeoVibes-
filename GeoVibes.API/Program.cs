using System.Text;
using GeoVibes.API.Endpoints;
using GeoVibes.API.Mappings;
using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Services;
using GeoVibes.Infrastructure.Data;
using GeoVibes.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// ─── Entity Framework Core con SQL Server ────────────────────────────────────
builder.Services.AddDbContext<GeoVibesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ─── Registro de Repositorios ─────────────────────────────────────────────────
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IPaisRepository, PaisRepository>();
builder.Services.AddScoped<ILugarRepository, LugarRepository>();
builder.Services.AddScoped<IFavoritoRepository, FavoritoRepository>();

// ─── Registro de Servicios ────────────────────────────────────────────────────
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IPaisService, PaisService>();
builder.Services.AddScoped<IFavoritoService, FavoritoService>();

// ─── AutoMapper ───────────────────────────────────────────────────────────────
builder.Services.AddAutoMapper(typeof(UsuarioMappingProfile), typeof(PaisMappingProfile), typeof(FavoritoMappingProfile));

// ─── Autenticación JWT Bearer ─────────────────────────────────────────────────
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("La clave JWT no está configurada.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer              = builder.Configuration["Jwt:Issuer"],
            ValidAudience            = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

// ─── OpenAPI / Swagger ────────────────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title       = "GeoVibes API",
        Version     = "v1",
        Description = "API REST para la aplicación móvil GeoVibes — exploración y turismo por América."
    });
});

var app = builder.Build();

// ─── Pipeline HTTP ────────────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// ─── Endpoints ────────────────────────────────────────────────────────────────
app.MapUsuariosEndpoints();
app.MapPaisesEndpoints();
app.MapFavoritosEndpoints();

app.Run();

