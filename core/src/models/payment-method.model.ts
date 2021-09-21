import {Entity, model, property} from '@loopback/repository';

@model()
export class PaymentMethod extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;


  constructor(data?: Partial<PaymentMethod>) {
    super(data);
  }
}

export interface PaymentMethodRelations {
  // describe navigational properties here
}

export type PaymentMethodWithRelations = PaymentMethod & PaymentMethodRelations;
