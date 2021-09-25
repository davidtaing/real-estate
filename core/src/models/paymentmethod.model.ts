import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'paymentmethod'}}
})
export class Paymentmethod extends Entity {
  @property({
    type: 'string',
    required: true,
    id: 1,
    postgresql: {columnName: 'code', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  code: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'desc', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  desc: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Paymentmethod>) {
    super(data);
  }
}

export interface PaymentmethodRelations {
  // describe navigational properties here
}

export type PaymentmethodWithRelations = Paymentmethod & PaymentmethodRelations;
