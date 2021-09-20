import {Entity, model, property} from '@loopback/repository';

@model()
export class Tenant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  tenancyId?: string;

  @property({
    type: 'string',
    required: true,
  })
  full_name: string;

  @property({
    type: 'string',
    required: true,
  })
  preferred_name: string;

  @property({
    type: 'string',
    required: true,
  })
  prop_id: string;

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
  phone?: string;

  @property({
    type: 'string',
  })
  work_phone?: string;


  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
