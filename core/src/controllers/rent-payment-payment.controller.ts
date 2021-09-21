import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RentPayment,
  Payment,
} from '../models';
import {RentPaymentRepository} from '../repositories';

export class RentPaymentPaymentController {
  constructor(
    @repository(RentPaymentRepository)
    public rentPaymentRepository: RentPaymentRepository,
  ) { }

  @get('/rent-payments/{id}/payment', {
    responses: {
      '200': {
        description: 'Payment belonging to RentPayment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Payment)},
          },
        },
      },
    },
  })
  async getPayment(
    @param.path.string('id') id: typeof RentPayment.prototype.paymentNumber,
  ): Promise<Payment> {
    return this.rentPaymentRepository.payment(id);
  }
}
