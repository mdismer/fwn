namespace Mdismer.FWN.Base.Handlers;

public interface IQueryHandler<in TQueryParameters, TResult>
{
    Task<TResult> ExecuteQueryAsync(TQueryParameters parameters);
}

public interface IQueryHandler<TResult>
{
    Task<TResult> ExecuteQueryAsync();
}
