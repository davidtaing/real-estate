import {Entity, model, property} from '@loopback/repository';

@model()
export class RentPayment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  paymentId: string;

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
