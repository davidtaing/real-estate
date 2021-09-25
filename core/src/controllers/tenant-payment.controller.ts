import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TenantPayment} from '../models';
import {TenantPaymentRepository} from '../repositories';

export class TenantPaymentController {
  constructor(
    @repository(TenantPaymentRepository)
    public tenantPaymentRepository : TenantPaymentRepository,
  ) {}

  @post('/tenant-payments')
  @response(200, {
    description: 'TenantPayment model instance',
    content: {'application/json': {schema: getModelSchemaRef(TenantPayment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenantPayment, {
            title: 'NewTenantPayment',
            exclude: ['number'],
          }),
        },
      },
    })
    tenantPayment: Omit<TenantPayment, 'number'>,
  ): Promise<TenantPayment> {
    return this.tenantPaymentRepository.create(tenantPayment);
  }

  @get('/tenant-payments')
  @response(200, {
    description: 'Array of TenantPayment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TenantPayment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TenantPayment) filter?: Filter<TenantPayment>,
  ): Promise<TenantPayment[]> {
    return this.tenantPaymentRepository.find(filter);
  }

  @get('/tenant-payments/{id}')
  @response(200, {
    description: 'TenantPayment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TenantPayment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TenantPayment, {exclude: 'where'}) filter?: FilterExcludingWhere<TenantPayment>
  ): Promise<TenantPayment> {
    return this.tenantPaymentRepository.findById(id, filter);
  }

  @patch('/tenant-payments/{id}')
  @response(204, {
    description: 'TenantPayment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenantPayment, {partial: true}),
        },
      },
    })
    tenantPayment: TenantPayment,
  ): Promise<void> {
    await this.tenantPaymentRepository.updateById(id, tenantPayment);
  }

  @del('/tenant-payments/{id}')
  @response(204, {
    description: 'TenantPayment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tenantPaymentRepository.deleteById(id);
  }
}
