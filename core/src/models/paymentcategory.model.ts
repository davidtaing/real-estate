import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'paymentcategory'}}
})
export class Paymentcategory extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'code', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  code: number;

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

  constructor(data?: Partial<Paymentcategory>) {
    super(data);
  }
}

export interface PaymentcategoryRelations {
  // describe navigational properties here
}

export type PaymentcategoryWithRelations = Paymentcategory & PaymentcategoryRelations;
