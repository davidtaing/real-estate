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
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Landlord} from '../models';
import {LandlordRepository} from '../repositories';

export class LandlordController {
  constructor(
    @repository(LandlordRepository)
    public landlordRepository : LandlordRepository,
  ) {}

  @post('/landlords')
  @response(200, {
    description: 'Landlord model instance',
    content: {'application/json': {schema: getModelSchemaRef(Landlord)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Landlord, {
            title: 'NewLandlord',
            
          }),
        },
      },
    })
    landlord: Landlord,
  ): Promise<Landlord> {
    return this.landlordRepository.create(landlord);
  }

  @get('/landlords/count')
  @response(200, {
    description: 'Landlord model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Landlord) where?: Where<Landlord>,
  ): Promise<Count> {
    return this.landlordRepository.count(where);
  }

  @get('/landlords')
  @response(200, {
    description: 'Array of Landlord model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Landlord, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Landlord) filter?: Filter<Landlord>,
  ): Promise<Landlord[]> {
    return this.landlordRepository.find(filter);
  }

  @patch('/landlords')
  @response(200, {
    description: 'Landlord PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Landlord, {partial: true}),
        },
      },
    })
    landlord: Landlord,
    @param.where(Landlord) where?: Where<Landlord>,
  ): Promise<Count> {
    return this.landlordRepository.updateAll(landlord, where);
  }

  @get('/landlords/{id}')
  @response(200, {
    description: 'Landlord model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Landlord, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Landlord, {exclude: 'where'}) filter?: FilterExcludingWhere<Landlord>
  ): Promise<Landlord> {
    return this.landlordRepository.findById(id, filter);
  }

  @patch('/landlords/{id}')
  @response(204, {
    description: 'Landlord PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Landlord, {partial: true}),
        },
      },
    })
    landlord: Landlord,
  ): Promise<void> {
    await this.landlordRepository.updateById(id, landlord);
  }

  @del('/landlords/{id}')
  @response(204, {
    description: 'Landlord DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.landlordRepository.deleteById(id);
  }
}
