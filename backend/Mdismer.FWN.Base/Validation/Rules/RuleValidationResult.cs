namespace Mdismer.FWN.Base.Validation.Rules;

public class RuleValidationResult
{
    public bool IsValid { get; private init; }

    public string? ErrorMessage { get; private init; }

    private RuleValidationResult()
    { }

    public static RuleValidationResult ValidResult()
    {
        //constant
        return new RuleValidationResult { IsValid = true };
    }

    public static RuleValidationResult InvalidResult(string message)
    {
        return new RuleValidationResult { ErrorMessage = message };
    }
}
