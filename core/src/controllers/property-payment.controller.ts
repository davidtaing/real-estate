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

  @post('/properties/{id}/payments', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPaymentInProperty',
            exclude: ['number'],
            optional: ['propertyId']
          }),
        },
      },
    }) payment: Omit<Payment, 'number'>,
  ): Promise<Payment> {
    return this.propertyRepository.payments(id).create(payment);
  }

  @patch('/properties/{id}/payments', {
    responses: {
      '200': {
        description: 'Property.Payment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Partial<Payment>,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.propertyRepository.payments(id).patch(payment, where);
  }

  @del('/properties/{id}/payments', {
    responses: {
      '200': {
        description: 'Property.Payment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.propertyRepository.payments(id).delete(where);
  }
}
