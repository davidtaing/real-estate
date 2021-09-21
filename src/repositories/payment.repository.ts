import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Payment, PaymentRelations, Tenant} from '../models';
import {TenantRepository} from './tenant.repository';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.invoiceNo,
  PaymentRelations
> {

  public readonly tenant: BelongsToAccessor<Tenant, typeof Payment.prototype.invoiceNo>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('TenantRepository') protected tenantRepositoryGetter: Getter<TenantRepository>,
  ) {
    super(Payment, dataSource);
    this.tenant = this.createBelongsToAccessorFor('tenant', tenantRepositoryGetter,);
    this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
  }
}
