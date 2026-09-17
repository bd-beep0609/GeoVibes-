namespace GeoVibes.API.DTOs;

public class PaisResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? NombreOficial { get; set; }
    public string CodigoISO { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string Capital { get; set; } = string.Empty;
    public string Moneda { get; set; } = string.Empty;
    public string IdiomaOficial { get; set; } = string.Empty;
    public string AveNacional { get; set; } = string.Empty;
    public string BanderaUrl { get; set; } = string.Empty;
    public string? AnimacionAveUrl { get; set; }
    public string ColorPrimario { get; set; } = string.Empty;
    public string ColorSecundario { get; set; } = string.Empty;
    public string? DescripcionBreve { get; set; }
}

public class DetallePaisResponse : PaisResponse
{
    public CulturaResponse? Cultura { get; set; }
}

public class CulturaResponse
{
    public string? Gastronomia { get; set; }
    public string? Musica { get; set; }
    public string? Patrimonio { get; set; }
    public string? DatoCurioso { get; set; }
}
