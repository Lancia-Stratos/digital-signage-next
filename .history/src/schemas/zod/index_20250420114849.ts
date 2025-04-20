import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ProductScalarFieldEnumSchema = z.enum(['id','name','defaultLength','unitId','customerId','createdAt','updatedAt']);

export const UnitScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const CustomerScalarFieldEnumSchema = z.enum(['id','name','address','postalCode','phoneNumber','email','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','role','createdAt','updatedAt']);

export const ShipmentScalarFieldEnumSchema = z.enum(['id','shipmentDate','customerId','productId','quantity','length','lotNumber','status','notes','createdAt','updatedAt','createdBy']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserRoleSchema = z.enum(['ADMIN','MANAGER','USER']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const ShipmentStatusSchema = z.enum(['SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED']);

export type ShipmentStatusType = `${z.infer<typeof ShipmentStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  defaultLength: z.number().nullable(),
  unitId: z.number().int(),
  customerId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// UNIT SCHEMA
/////////////////////////////////////////

export const UnitSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Unit = z.infer<typeof UnitSchema>

/////////////////////////////////////////
// CUSTOMER SCHEMA
/////////////////////////////////////////

export const CustomerSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  postalCode: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Customer = z.infer<typeof CustomerSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SHIPMENT SCHEMA
/////////////////////////////////////////

export const ShipmentSchema = z.object({
  status: ShipmentStatusSchema,
  id: z.number().int(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdBy: z.number().int().nullable(),
})

export type Shipment = z.infer<typeof ShipmentSchema>
