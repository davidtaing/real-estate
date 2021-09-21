import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Tenant} from './tenant.model';
import {Property} from './property.model';

@model({settings: {strict: false}})
export class Payment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  invoiceNo?: number;

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
    type: 'string',
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

  @belongsTo(() => Tenant)
  tenantId: string;

  @belongsTo(() => Property)
  propertyId: string;
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
