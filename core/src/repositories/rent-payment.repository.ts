import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {RentPayment, RentPaymentRelations, Payment} from '../models';
import {PaymentRepository} from './payment.repository';

export class RentPaymentRepository extends DefaultCrudRepository<
  RentPayment,
  typeof RentPayment.prototype.paymentNumber,
  RentPaymentRelations
> {

  public readonly payment: BelongsToAccessor<Payment, typeof RentPayment.prototype.paymentNumber>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(RentPayment, dataSource);
    this.payment = this.createBelongsToAccessorFor('payment', paymentRepositoryGetter,);
    this.registerInclusionResolver('payment', this.payment.inclusionResolver);
  }
}
