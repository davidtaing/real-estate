import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {RentPayment, RentPaymentRelations} from '../models';

export class RentPaymentRepository extends DefaultCrudRepository<
  RentPayment,
  typeof RentPayment.prototype.paymentId,
  RentPaymentRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(RentPayment, dataSource);
  }
}
