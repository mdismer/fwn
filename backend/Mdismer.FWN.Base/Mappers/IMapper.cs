namespace Mdismer.FWN.Base.Mappers;

public interface IMapper<in TEntity, out TDto>
{
    TDto Map(TEntity source);
}
