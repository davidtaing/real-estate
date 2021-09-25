import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {TenantPayment, TenantPaymentRelations} from '../models';

export class TenantPaymentRepository extends DefaultCrudRepository<
  TenantPayment,
  typeof TenantPayment.prototype.number,
  TenantPaymentRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(TenantPayment, dataSource);
  }
}
