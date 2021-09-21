import {Entity, model, property} from '@loopback/repository';

@model()
export class PaymentCategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  code: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;


  constructor(data?: Partial<PaymentCategory>) {
    super(data);
  }
}

export interface PaymentCategoryRelations {
  // describe navigational properties here
}

export type PaymentCategoryWithRelations = PaymentCategory & PaymentCategoryRelations;
