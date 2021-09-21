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
  PaymentCategory,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentPaymentCategoryController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/payment-category', {
    responses: {
      '200': {
        description: 'PaymentCategory belonging to Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentCategory)},
          },
        },
      },
    },
  })
  async getPaymentCategory(
    @param.path.number('id') id: typeof Payment.prototype.number,
  ): Promise<PaymentCategory> {
    return this.paymentRepository.paymentCategory(id);
  }
}
