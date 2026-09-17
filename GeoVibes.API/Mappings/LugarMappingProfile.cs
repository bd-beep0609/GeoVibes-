using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Models;

namespace GeoVibes.API.Mappings;

public class LugarMappingProfile : Profile
{
    public LugarMappingProfile()
    {
        CreateMap<LugarTuristico, LugarResponse>()
            .ForMember(dest => dest.MotivoNombre, opt => opt.MapFrom(src => src.Motivo != null ? src.Motivo.Nombre : null))
            .ForMember(dest => dest.CategoriaNombre, opt => opt.MapFrom(src => src.Categoria != null ? src.Categoria.Nombre : null))
            .ForMember(dest => dest.CategoriaIcono, opt => opt.MapFrom(src => src.Categoria != null ? src.Categoria.Icono : null));

        CreateMap<CategoriaLugar, CategoriaResponse>();
        CreateMap<MotivoLugar, MotivoResponse>();
    }
}
