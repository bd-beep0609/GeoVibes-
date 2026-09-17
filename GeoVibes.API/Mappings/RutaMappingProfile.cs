using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Models;

namespace GeoVibes.API.Mappings;

public class RutaMappingProfile : Profile
{
    public RutaMappingProfile()
    {
        CreateMap<RutaUsuario, RutaResponse>()
            .ForMember(dest => dest.PaisNombre, opt => opt.MapFrom(src => src.Pais.Nombre))
            .ForMember(dest => dest.PaisBanderaUrl, opt => opt.MapFrom(src => src.Pais.BanderaUrl))
            .ForMember(dest => dest.PaisCapital, opt => opt.MapFrom(src => src.Pais.Capital));
    }
}
