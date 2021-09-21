import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {PaymentMethod, PaymentMethodRelations} from '../models';

export class PaymentMethodRepository extends DefaultCrudRepository<
  PaymentMethod,
  typeof PaymentMethod.prototype.code,
  PaymentMethodRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(PaymentMethod, dataSource);
  }
}
