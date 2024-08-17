namespace Mdismer.FWN.Base.Domain;

/// <summary>
/// Special handling for InformationVersion
/// </summary>
/// <remarks>
/// 1. Cannot move this one into informations service because of the interceptor<br />
/// 2. InformationVersion can be deleted 'on its own' when an information is published<br />
/// (publishing will remove the unpublished versions)
/// </remarks>
public interface IDoHardDelete : IHasDeleteMarker
{
    bool DoHardDelete { get; }
}