namespace Mdismer.FWN.Base.Domain;

public interface IHasConcurrencyToken
{
    Guid ConcurrencyToken { get; set; }
}