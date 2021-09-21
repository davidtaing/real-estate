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
  PaymentMethod,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentPaymentMethodController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/payment-method', {
    responses: {
      '200': {
        description: 'PaymentMethod belonging to Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentMethod)},
          },
        },
      },
    },
  })
  async getPaymentMethod(
    @param.path.number('id') id: typeof Payment.prototype.number,
  ): Promise<PaymentMethod> {
    return this.paymentRepository.paymentMethod(id);
  }
}
