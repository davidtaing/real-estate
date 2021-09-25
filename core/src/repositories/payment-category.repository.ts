import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {PaymentCategory, PaymentCategoryRelations} from '../models';

export class PaymentCategoryRepository extends DefaultCrudRepository<
  PaymentCategory,
  typeof PaymentCategory.prototype.code,
  PaymentCategoryRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(PaymentCategory, dataSource);
  }
}
