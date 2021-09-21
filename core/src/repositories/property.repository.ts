import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Property, PropertyRelations, Payment} from '../models';
import {PaymentRepository} from './payment.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly payments: HasManyRepositoryFactory<Payment, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(Property, dataSource);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter,);
  }
}
