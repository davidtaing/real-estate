import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param, post,
  requestBody
} from '@loopback/rest';
import {
  Property,
  Tenant
} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyTenantController {
  constructor(
    @repository(PropertyRepository) protected propertyRepository: PropertyRepository,
  ) { }

  @get('/properties/{id}/tenants', {
    responses: {
      '200': {
        description: 'Array of Property has many Tenant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tenant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tenant>,
  ): Promise<Tenant[]> {
    return this.propertyRepository.tenants(id).find(filter);
  }

  @post('/properties/{id}/tenants', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tenant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Property.prototype.propId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tenant, {
            title: 'NewTenantInProperty',
            exclude: ['tenancyId'],
            optional: ['propertyId']
          }),
        },
      },
    }) tenant: Omit<Tenant, 'tenancyId'>,
  ): Promise<Tenant> {
    return this.propertyRepository.tenants(id).create(tenant);
  }

  @del('/properties/{id}/tenants', {
    responses: {
      '200': {
        description: 'Property.Tenant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tenant)) where?: Where<Tenant>,
  ): Promise<Count> {
    return this.propertyRepository.tenants(id).delete(where);
  }
}
