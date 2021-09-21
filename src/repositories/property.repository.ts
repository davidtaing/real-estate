import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Payment, Property, PropertyRelations, Tenant} from '../models';
import {PaymentRepository} from './payment.repository';
import {TenantRepository} from './tenant.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.propertyId,
  PropertyRelations
> {

  public readonly tenants: HasManyRepositoryFactory<Tenant, typeof Property.prototype.propertyId>;

  public readonly payments: HasManyRepositoryFactory<Payment, typeof Property.prototype.propertyId>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TenantRepository') protected tenantRepositoryGetter: Getter<TenantRepository>, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Property, dataSource);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter,);
    this.tenants = this.createHasManyRepositoryFactoryFor('tenants', tenantRepositoryGetter,);
  }
}
