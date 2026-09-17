using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Models;

namespace GeoVibes.API.Mappings;

public class FavoritoMappingProfile : Profile
{
    public FavoritoMappingProfile()
    {
        CreateMap<Favorito, FavoritoResponse>()
            .ForMember(dest => dest.PaisNombre, opt => opt.MapFrom(src => src.Pais.Nombre))
            .ForMember(dest => dest.PaisBanderaUrl, opt => opt.MapFrom(src => src.Pais.BanderaUrl));
    }
}
