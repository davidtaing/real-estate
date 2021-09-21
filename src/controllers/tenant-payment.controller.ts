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
  Tenant,
  Payment,
} from '../models';
import {TenantRepository} from '../repositories';

export class TenantPaymentController {
  constructor(
    @repository(TenantRepository) protected tenantRepository: TenantRepository,
  ) { }

  @get('/tenants/{id}/payments', {
    responses: {
      '200': {
        description: 'Array of Tenant has many Payment',
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
    return this.tenantRepository.payments(id).find(filter);
  }

  @post('/tenants/{id}/payments', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tenant.prototype.tenancyId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPaymentInTenant',
            exclude: ['invoiceNo'],
            optional: ['tenantId']
          }),
        },
      },
    }) payment: Omit<Payment, 'invoiceNo'>,
  ): Promise<Payment> {
    return this.tenantRepository.payments(id).create(payment);
  }

  @patch('/tenants/{id}/payments', {
    responses: {
      '200': {
        description: 'Tenant.Payment PATCH success count',
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
    return this.tenantRepository.payments(id).patch(payment, where);
  }

  @del('/tenants/{id}/payments', {
    responses: {
      '200': {
        description: 'Tenant.Payment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Payment)) where?: Where<Payment>,
  ): Promise<Count> {
    return this.tenantRepository.payments(id).delete(where);
  }
}
