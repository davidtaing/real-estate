import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'tenantpayment'}}
})
export class TenantPayment extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'number', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  number: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  date: string;

  @property({
    type: 'number',
    precision: 53,
    postgresql: {columnName: 'debit', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  debit?: number;

  @property({
    type: 'number',
    precision: 53,
    postgresql: {columnName: 'credit', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  credit?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'propertyid', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  propertyid: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  description: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'payer', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  payer: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'payee', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  payee: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'methodcode', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  methodcode: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'categorycode', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  categorycode: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'tenantid', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  tenantid: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'receiveddate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  receiveddate: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'paidfromdate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  paidfromdate: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'paidtodate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  paidtodate: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TenantPayment>) {
    super(data);
  }
}

export interface TenantPaymentRelations {
  // describe navigational properties here
}

export type TenantPaymentWithRelations = TenantPayment & TenantPaymentRelations;
