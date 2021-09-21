import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Payment,
  Property,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentPropertyController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.number('id') id: typeof Payment.prototype.invoiceNo,
  ): Promise<Property> {
    return this.paymentRepository.property(id);
  }
}
