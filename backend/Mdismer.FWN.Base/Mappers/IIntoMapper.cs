namespace Mdismer.FWN.Base.Mappers;

public interface IIntoMapper<in TDto, in TEntity>
{
    void Map(TDto source, TEntity target);
}