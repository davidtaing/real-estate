import {Entity, hasMany, model, property} from '@loopback/repository';
import {Payment} from './payment.model';

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
  fullName: string;

  @property({
    type: 'string',
    required: true,
  })
  preferredName: string;

  @property({
    type: 'string',
    required: true,
  })
  propId: string;

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
  workPhone?: string;

  @hasMany(() => Payment)
  payments: Payment[];

  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
