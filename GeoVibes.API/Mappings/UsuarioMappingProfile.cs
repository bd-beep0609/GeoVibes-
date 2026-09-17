using AutoMapper;
using GeoVibes.Core.DTOs;
using GeoVibes.Core.Models;

namespace GeoVibes.API.Mappings;

public class UsuarioMappingProfile : Profile
{
    public UsuarioMappingProfile()
    {
        // Usuario → LoginResponse (Token se asigna manualmente en el servicio)
        CreateMap<Usuario, LoginResponse>();

        // RegistroRequest → Usuario
        CreateMap<RegistroRequest, Usuario>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaRegistro, opt => opt.Ignore())
            .ForMember(dest => dest.Activo, opt => opt.Ignore())
            .ForMember(dest => dest.Rol, opt => opt.Ignore())
            .ForMember(dest => dest.TokenRecuperacion, opt => opt.Ignore())
            .ForMember(dest => dest.Favoritos, opt => opt.Ignore())
            .ForMember(dest => dest.RutasUsuario, opt => opt.Ignore());

        // LoginRequest → Usuario (solo para búsqueda por correo)
        CreateMap<LoginRequest, Usuario>()
            .ForMember(dest => dest.Correo, opt => opt.MapFrom(src => src.Correo))
            .ForAllMembers(opt => opt.Ignore());

        // Reconfiguramos el mapeo de Correo que fue ignorado globalmente
        CreateMap<LoginRequest, Usuario>()
            .ForMember(dest => dest.Correo, opt => opt.MapFrom(src => src.Correo))
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.NombreCompleto, opt => opt.Ignore())
            .ForMember(dest => dest.PaisOrigen, opt => opt.Ignore())
            .ForMember(dest => dest.FechaRegistro, opt => opt.Ignore())
            .ForMember(dest => dest.Activo, opt => opt.Ignore())
            .ForMember(dest => dest.Rol, opt => opt.Ignore())
            .ForMember(dest => dest.TokenRecuperacion, opt => opt.Ignore())
            .ForMember(dest => dest.Favoritos, opt => opt.Ignore())
            .ForMember(dest => dest.RutasUsuario, opt => opt.Ignore());
    }
}
