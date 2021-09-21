import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Payment, PaymentRelations} from '../models';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.invoiceNo,
  PaymentRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Payment, dataSource);
  }
}
