import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Property, PropertyRelations, Tenant, Payment} from '../models';
import {TenantRepository} from './tenant.repository';
import {PaymentRepository} from './payment.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.propId,
  PropertyRelations
> {

  public readonly tenants: HasManyRepositoryFactory<Tenant, typeof Property.prototype.propId>;

  public readonly payments: HasManyRepositoryFactory<Payment, typeof Property.prototype.propId>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TenantRepository') protected tenantRepositoryGetter: Getter<TenantRepository>, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Property, dataSource);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter,);
    this.tenants = this.createHasManyRepositoryFactoryFor('tenants', tenantRepositoryGetter,);
  }
}
