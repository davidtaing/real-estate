import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Property,
  Payment,
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyPaymentController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/payments', {
    responses: {
      '200': {
        description: 'Array of Property has many Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Payment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    return this.propertyRepository.payments(id).find(filter);
  }
}
