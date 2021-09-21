import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Payment, PaymentRelations, PaymentMethod, PaymentCategory} from '../models';
import {PaymentMethodRepository} from './payment-method.repository';
import {PaymentCategoryRepository} from './payment-category.repository';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.number,
  PaymentRelations
> {

  public readonly paymentMethod: BelongsToAccessor<PaymentMethod, typeof Payment.prototype.number>;

  public readonly paymentCategory: BelongsToAccessor<PaymentCategory, typeof Payment.prototype.number>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PaymentMethodRepository') protected paymentMethodRepositoryGetter: Getter<PaymentMethodRepository>, @repository.getter('PaymentCategoryRepository') protected paymentCategoryRepositoryGetter: Getter<PaymentCategoryRepository>,
  ) {
    super(Payment, dataSource);
    this.paymentCategory = this.createBelongsToAccessorFor('paymentCategory', paymentCategoryRepositoryGetter,);
    this.registerInclusionResolver('paymentCategory', this.paymentCategory.inclusionResolver);
    this.paymentMethod = this.createBelongsToAccessorFor('paymentMethod', paymentMethodRepositoryGetter,);
    this.registerInclusionResolver('paymentMethod', this.paymentMethod.inclusionResolver);
  }
}
