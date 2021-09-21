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
  Tenant,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentTenantController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/tenant', {
    responses: {
      '200': {
        description: 'Tenant belonging to Payment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tenant)},
          },
        },
      },
    },
  })
  async getTenant(
    @param.path.number('id') id: typeof Payment.prototype.invoiceNo,
  ): Promise<Tenant> {
    return this.paymentRepository.tenant(id);
  }
}
