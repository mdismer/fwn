namespace Mdismer.FWN.Base.Extensions;

public static class EnumerableExtensions
{
    public static Differences<T> Differences<T>(this IEnumerable<T> before, IEnumerable<T> after)
    {
        return Differences(ToArray(before), ToArray(after));
    }

    private static T[] ToArray<T>(IEnumerable<T> enumerable)
    {
        if (enumerable is T[] array)
        {
            return array;
        }

        return enumerable.ToArray();
    }

    public static Differences<T> Differences<T>(this T[] before, T[] after)
    {
        var itemsAdded = after.Except(before)
                              .ToArray();

        var itemsRemoved = before.Except(after)
                                 .ToArray();

        return new Differences<T>(itemsAdded, itemsRemoved);
    }

    public static void ForEach<T>(this IEnumerable<T> enumerable, Action<T> action)
    {
        foreach (var item in enumerable)
        {
            action(item);
        }
    }

    public static async Task ForEach<T>(this IEnumerable<T> enumerable, Func<T, Task> action)
    {
        foreach (var item in enumerable)
        {
            await action(item);
        }
    }

    public static IEnumerable<T> EmptyIfNull<T>(this IEnumerable<T>? enumerable)
    {
        return enumerable ?? Enumerable.Empty<T>();
    }

    public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> items)
    {
        foreach (var item in items)
        {
            collection.Add(item);
        }
    }
}
