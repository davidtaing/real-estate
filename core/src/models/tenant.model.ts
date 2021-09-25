import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'tenant'}}
})
export class Tenant extends Entity {
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
    postgresql: {columnName: 'fullnames', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fullnames: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'preferrednames', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  preferrednames: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'propertyid', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  propertyid: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'mobile', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  mobile: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'homephone', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  homephone?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'workphone', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  workphone?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
