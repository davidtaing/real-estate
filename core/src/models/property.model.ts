import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Payment} from './payment.model';
import {Landlord} from './landlord.model';

@model()
export class Property extends Entity {
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
  addressLn1: string;

  @property({
    type: 'string',
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
  @hasMany(() => Payment)
  payments: Payment[];

  @belongsTo(() => Landlord)
  landlordId: string;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
