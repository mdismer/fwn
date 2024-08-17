namespace Mdismer.FWN.Base.Validation.Rules;

/// <summary>
/// Main interface for validation rules. Implement this if you want to add custom rules to your project.
/// For ease of use it is recommended to use the <see cref="ValidationRule{T}"/> base class instead.
/// </summary>
public interface IValidationRule<in T>
{
    /// <summary>
    /// Apply the defined rule to the specified <param name="item" />.
    /// </summary>
    RuleValidationResult Apply(T item);
}
