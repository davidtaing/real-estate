import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Property,
  Landlord,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyLandlordController {
  constructor(
    @repository(PropertyRepository)
    public propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/landlord', {
    responses: {
      '200': {
        description: 'Landlord belonging to Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Landlord)},
          },
        },
      },
    },
  })
  async getLandlord(
    @param.path.string('id') id: typeof Property.prototype.id,
  ): Promise<Landlord> {
    return this.propertyRepository.landlord(id);
  }
}
