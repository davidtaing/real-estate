import {Entity, model, property} from '@loopback/repository';

@model()
export class Property extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  prop_id: string;

  @property({
    type: 'string',
    required: true,
  })
  address_ln1: string;

  @property({
    type: 'string',
    required: true,
  })
  address_ln2: string;

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


  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
