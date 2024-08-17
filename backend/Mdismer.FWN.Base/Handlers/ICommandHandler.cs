namespace Mdismer.FWN.Base.Handlers;

public interface ICommandHandler<in TParameters, TResult>
{
    Task<TResult> ExecuteCommandAsync(TParameters parameters);
}

public interface ICommandHandler<in TParameters>
{
    Task ExecuteCommandAsync(TParameters parameters);
}
