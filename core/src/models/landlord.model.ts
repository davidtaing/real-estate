import {Entity, model, property} from '@loopback/repository';

@model()
export class Landlord extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
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

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  constructor(data?: Partial<Landlord>) {
    super(data);
  }
}

export interface LandlordRelations {
  // describe navigational properties here
}

export type LandlordWithRelations = Landlord & LandlordRelations;
