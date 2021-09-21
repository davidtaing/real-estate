import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Payment, Tenant, TenantRelations} from '../models';
import {PaymentRepository} from './payment.repository';

export class TenantRepository extends DefaultCrudRepository<
  Tenant,
  typeof Tenant.prototype.tenantId,
  TenantRelations
> {

  public readonly payments: HasManyRepositoryFactory<Payment, typeof Tenant.prototype.tenantId>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Tenant, dataSource);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter,);
  }
}
