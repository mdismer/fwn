using Mdismer.FWN.Base.Validation.Rules;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace Mdismer.FWN.Base.Validation;

public interface IValidator<T>
{
    IValidator<T> AddComplexRule<TType>(Expression<Func<T, TType>> selector, IValidationRule<T> rule);

    IValidator<T> AddRule<TType>(Expression<Func<T, TType>> selector, IValidationRule<TType> rule);

    ValidationResult Validate();

    void ValidOrThrow();
}
