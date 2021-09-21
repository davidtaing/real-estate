import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tenant,
  Property,
} from '../models';
import {TenantRepository} from '../repositories';

export class TenantPropertyController {
  constructor(
    @repository(TenantRepository)
    public tenantRepository: TenantRepository,
  ) { }

  @get('/tenants/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to Tenant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.string('id') id: typeof Tenant.prototype.tenancyId,
  ): Promise<Property> {
    return this.tenantRepository.property(id);
  }
}
