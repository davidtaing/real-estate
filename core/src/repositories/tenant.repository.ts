import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Tenant, TenantRelations} from '../models';

export class TenantRepository extends DefaultCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Tenant, dataSource);
  }
}
