import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Payment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  paymentNo?: number;

  @property({
    type: 'string',
    required: true,
  })
  propId: string;
  @property({
    type: 'date',
    required: true,
  })
  processDate: string;

  @property({
    type: 'date',
    required: true,
  })
  receivedDate: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  receivedFrom: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentMethod: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
