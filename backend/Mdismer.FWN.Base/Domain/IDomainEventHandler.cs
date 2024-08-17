using MediatR;

namespace Mdismer.FWN.Base.Domain;

public interface IDomainEventHandler<in TDomainEvent> : INotificationHandler<TDomainEvent>
    where TDomainEvent : DomainEvent;
