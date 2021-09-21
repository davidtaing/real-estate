import {Entity, hasMany, model, property} from '@loopback/repository';
import {Payment} from './payment.model';
import {Tenant} from './tenant.model';

@model()
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  propId: string;

  @property({
    type: 'string',
    required: true,
  })
  addressLn1: string;

  @property({
    type: 'string',
    required: true,
  })
  addressLn2: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  postcode: string;

  @hasMany(() => Tenant)
  tenants: Tenant[];

  @hasMany(() => Payment)
  payments: Payment[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
