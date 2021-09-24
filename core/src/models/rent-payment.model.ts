import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Payment} from './payment.model';

@model()
export class RentPayment extends Entity {
  paymentNumber: number;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  tenantId: string;

  @property({
    type: 'date',
    required: true,
  })
  paidFrom: string;

  @property({
    type: 'date',
    required: true,
  })
  paidTo: string;
  
  constructor(data?: Partial<RentPayment>) {
    super(data);
  }
}

export interface RentPaymentRelations {
  // describe navigational properties here
}

export type RentPaymentWithRelations = RentPayment & RentPaymentRelations;