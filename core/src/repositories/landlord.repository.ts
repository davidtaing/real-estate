import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Landlord, LandlordRelations} from '../models';

export class LandlordRepository extends DefaultCrudRepository<
  Landlord,
  typeof Landlord.prototype.id,
  LandlordRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Landlord, dataSource);
  }
}
