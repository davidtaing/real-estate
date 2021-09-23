import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Property, PropertyRelations, Payment, Landlord} from '../models';
import {PaymentRepository} from './payment.repository';
import {LandlordRepository} from './landlord.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly payments: HasManyRepositoryFactory<Payment, typeof Property.prototype.id>;

  public readonly landlord: BelongsToAccessor<Landlord, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PaymentRepository') protected paymentRepositoryGetter: Getter<PaymentRepository>, @repository.getter('LandlordRepository') protected landlordRepositoryGetter: Getter<LandlordRepository>,
  ) {
    super(Property, dataSource);
    this.landlord = this.createBelongsToAccessorFor('landlord', landlordRepositoryGetter,);
    this.registerInclusionResolver('landlord', this.landlord.inclusionResolver);
    this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter,);
  }
}
