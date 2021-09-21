import {Entity, model, property} from '@loopback/repository';

@model()
export class Tenant extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fullNames: string;

  @property({
    type: 'string',
    required: true,
  })
  preferredNames: string;

  @property({
    type: 'string',
    required: true,
  })
  propertyId: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile: string;

  @property({
    type: 'string',
  })
  homePhone: string;

  @property({
    type: 'string',
  })
  workPhone: string;


  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
