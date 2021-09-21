import {Entity, model, property} from '@loopback/repository';

@model()
export class Payment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  number?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
  })
  debit?: number;

  @property({
    type: 'number',
  })
  credit?: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  propertyId: string;

  @property({
    type: 'string',
    required: true,
  })
  payer: string;

  @property({
    type: 'string',
    required: true,
  })
  payee: string;

  @property({
    type: 'number',
    required: true,
  })
  categoryCode: number;

  @property({
    type: 'string',
    required: true,
  })
  methodCode: string;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
