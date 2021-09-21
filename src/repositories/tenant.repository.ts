import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Tenant, TenantRelations, Property} from '../models';
import {PropertyRepository} from './property.repository';

export class TenantRepository extends DefaultCrudRepository<
  Tenant,
  typeof Tenant.prototype.tenancyId,
  TenantRelations
> {

  public readonly property: BelongsToAccessor<Property, typeof Tenant.prototype.tenancyId>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Tenant, dataSource);
    this.property = this.createBelongsToAccessorFor('property', propertyRepositoryGetter,);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
  }
}
