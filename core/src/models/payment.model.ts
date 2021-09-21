import {Entity, model, property, belongsTo} from '@loopback/repository';
import {PaymentMethod} from './payment-method.model';
import {PaymentCategory} from './payment-category.model';

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
  @belongsTo(() => PaymentMethod, {name: 'paymentMethod'})
  methodCode: string;

  @belongsTo(() => PaymentCategory, {name: 'paymentCategory'})
  categoryCode: number;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
