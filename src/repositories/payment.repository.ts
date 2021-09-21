import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Payment, PaymentRelations, Tenant, Property} from '../models';
import {TenantRepository} from './tenant.repository';
import {PropertyRepository} from './property.repository';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.invoiceNo,
  PaymentRelations
> {

  public readonly tenant: BelongsToAccessor<Tenant, typeof Payment.prototype.invoiceNo>;

  public readonly property: BelongsToAccessor<Property, typeof Payment.prototype.invoiceNo>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TenantRepository') protected tenantRepositoryGetter: Getter<TenantRepository>, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Payment, dataSource);
    this.property = this.createBelongsToAccessorFor('property', propertyRepositoryGetter,);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
    this.tenant = this.createBelongsToAccessorFor('tenant', tenantRepositoryGetter,);
    this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
  }
}
