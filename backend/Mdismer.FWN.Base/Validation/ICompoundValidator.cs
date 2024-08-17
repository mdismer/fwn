namespace Mdismer.FWN.Base.Validation;

public interface ICompoundValidator<in TItem>
{
    void Validate(TItem item);
}