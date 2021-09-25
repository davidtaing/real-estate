import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'property'}}
})
export class Property extends Entity {
  @property({
    type: 'string',
    required: true,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'addressln1', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  addressln1: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'addressln2', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  addressln2: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'city', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  city: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'state', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  state: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'postcode', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  postcode: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'landlordid', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  landlordid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
