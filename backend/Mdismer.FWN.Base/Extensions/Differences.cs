namespace Mdismer.FWN.Base.Extensions;

public record struct Differences<T>(T[] Added, T[] Removed);
