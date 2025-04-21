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

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  customer: z.union([z.boolean(),z.lazy(() => CustomerArgsSchema)]).optional(),
  shipments: z.union([z.boolean(),z.lazy(() => ShipmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  shipments: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  defaultLength: z.boolean().optional(),
  unitId: z.boolean().optional(),
  customerId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  customer: z.union([z.boolean(),z.lazy(() => CustomerArgsSchema)]).optional(),
  shipments: z.union([z.boolean(),z.lazy(() => ShipmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// UNIT
//------------------------------------------------------

export const UnitIncludeSchema: z.ZodType<Prisma.UnitInclude> = z.object({
  Product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UnitArgsSchema: z.ZodType<Prisma.UnitDefaultArgs> = z.object({
  select: z.lazy(() => UnitSelectSchema).optional(),
  include: z.lazy(() => UnitIncludeSchema).optional(),
}).strict();

export const UnitCountOutputTypeArgsSchema: z.ZodType<Prisma.UnitCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UnitCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UnitCountOutputTypeSelectSchema: z.ZodType<Prisma.UnitCountOutputTypeSelect> = z.object({
  Product: z.boolean().optional(),
}).strict();

export const UnitSelectSchema: z.ZodType<Prisma.UnitSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CUSTOMER
//------------------------------------------------------

export const CustomerIncludeSchema: z.ZodType<Prisma.CustomerInclude> = z.object({
  shipments: z.union([z.boolean(),z.lazy(() => ShipmentFindManyArgsSchema)]).optional(),
  Product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CustomerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CustomerArgsSchema: z.ZodType<Prisma.CustomerDefaultArgs> = z.object({
  select: z.lazy(() => CustomerSelectSchema).optional(),
  include: z.lazy(() => CustomerIncludeSchema).optional(),
}).strict();

export const CustomerCountOutputTypeArgsSchema: z.ZodType<Prisma.CustomerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CustomerCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CustomerCountOutputTypeSelectSchema: z.ZodType<Prisma.CustomerCountOutputTypeSelect> = z.object({
  shipments: z.boolean().optional(),
  Product: z.boolean().optional(),
}).strict();

export const CustomerSelectSchema: z.ZodType<Prisma.CustomerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  shipments: z.union([z.boolean(),z.lazy(() => ShipmentFindManyArgsSchema)]).optional(),
  Product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CustomerCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  shipments: z.union([z.boolean(),z.lazy(() => ShipmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  shipments: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  shipments: z.union([z.boolean(),z.lazy(() => ShipmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SHIPMENT
//------------------------------------------------------

export const ShipmentIncludeSchema: z.ZodType<Prisma.ShipmentInclude> = z.object({
  customer: z.union([z.boolean(),z.lazy(() => CustomerArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  createdByUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ShipmentArgsSchema: z.ZodType<Prisma.ShipmentDefaultArgs> = z.object({
  select: z.lazy(() => ShipmentSelectSchema).optional(),
  include: z.lazy(() => ShipmentIncludeSchema).optional(),
}).strict();

export const ShipmentSelectSchema: z.ZodType<Prisma.ShipmentSelect> = z.object({
  id: z.boolean().optional(),
  shipmentDate: z.boolean().optional(),
  customerId: z.boolean().optional(),
  productId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  length: z.boolean().optional(),
  lotNumber: z.boolean().optional(),
  status: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdBy: z.boolean().optional(),
  customer: z.union([z.boolean(),z.lazy(() => CustomerArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  createdByUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  defaultLength: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  customerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  unit: z.union([ z.lazy(() => UnitScalarRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional(),
  customer: z.union([ z.lazy(() => CustomerScalarRelationFilterSchema),z.lazy(() => CustomerWhereInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterSchema).optional()
}).strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
  customer: z.lazy(() => CustomerOrderByWithRelationInputSchema).optional(),
  shipments: z.lazy(() => ShipmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  defaultLength: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  customerId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  unit: z.union([ z.lazy(() => UnitScalarRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional(),
  customer: z.union([ z.lazy(() => CustomerScalarRelationFilterSchema),z.lazy(() => CustomerWhereInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterSchema).optional()
}).strict());

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  defaultLength: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  customerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UnitWhereInputSchema: z.ZodType<Prisma.UnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict();

export const UnitOrderByWithRelationInputSchema: z.ZodType<Prisma.UnitOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Product: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UnitWhereUniqueInputSchema: z.ZodType<Prisma.UnitWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict());

export const UnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.UnitOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UnitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UnitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UnitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UnitSumOrderByAggregateInputSchema).optional()
}).strict();

export const UnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UnitScalarWhereWithAggregatesInputSchema),z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitScalarWhereWithAggregatesInputSchema),z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CustomerWhereInputSchema: z.ZodType<Prisma.CustomerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CustomerWhereInputSchema),z.lazy(() => CustomerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerWhereInputSchema),z.lazy(() => CustomerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterSchema).optional(),
  Product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict();

export const CustomerOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  shipments: z.lazy(() => ShipmentOrderByRelationAggregateInputSchema).optional(),
  Product: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CustomerWhereUniqueInputSchema: z.ZodType<Prisma.CustomerWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CustomerWhereInputSchema),z.lazy(() => CustomerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerWhereInputSchema),z.lazy(() => CustomerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterSchema).optional(),
  Product: z.lazy(() => ProductListRelationFilterSchema).optional()
}).strict());

export const CustomerOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CustomerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CustomerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CustomerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CustomerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CustomerSumOrderByAggregateInputSchema).optional()
}).strict();

export const CustomerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema),z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema),z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema),z.lazy(() => UserRoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  shipments: z.lazy(() => ShipmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumUserRoleFilterSchema),z.lazy(() => UserRoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumUserRoleWithAggregatesFilterSchema),z.lazy(() => UserRoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ShipmentWhereInputSchema: z.ZodType<Prisma.ShipmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShipmentWhereInputSchema),z.lazy(() => ShipmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipmentWhereInputSchema),z.lazy(() => ShipmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  shipmentDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  customerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  productId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lotNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumShipmentStatusFilterSchema),z.lazy(() => ShipmentStatusSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  customer: z.union([ z.lazy(() => CustomerScalarRelationFilterSchema),z.lazy(() => CustomerWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  createdByUser: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ShipmentOrderByWithRelationInputSchema: z.ZodType<Prisma.ShipmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shipmentDate: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  lotNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  customer: z.lazy(() => CustomerOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  createdByUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ShipmentWhereUniqueInputSchema: z.ZodType<Prisma.ShipmentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ShipmentWhereInputSchema),z.lazy(() => ShipmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipmentWhereInputSchema),z.lazy(() => ShipmentWhereInputSchema).array() ]).optional(),
  shipmentDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  customerId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  productId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lotNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumShipmentStatusFilterSchema),z.lazy(() => ShipmentStatusSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  customer: z.union([ z.lazy(() => CustomerScalarRelationFilterSchema),z.lazy(() => CustomerWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  createdByUser: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ShipmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShipmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shipmentDate: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  lotNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ShipmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShipmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShipmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShipmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShipmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const ShipmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShipmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShipmentScalarWhereWithAggregatesInputSchema),z.lazy(() => ShipmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipmentScalarWhereWithAggregatesInputSchema),z.lazy(() => ShipmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  shipmentDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  customerId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  productId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  length: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  lotNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumShipmentStatusWithAggregatesFilterSchema),z.lazy(() => ShipmentStatusSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.object({
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema),
  customer: z.lazy(() => CustomerCreateNestedOneWithoutProductInputSchema),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  unitId: z.number().int(),
  customerId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneRequiredWithoutProductNestedInputSchema).optional(),
  customer: z.lazy(() => CustomerUpdateOneRequiredWithoutProductNestedInputSchema).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  unitId: z.number().int(),
  customerId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitCreateInputSchema: z.ZodType<Prisma.UnitCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Product: z.lazy(() => ProductCreateNestedManyWithoutUnitInputSchema).optional()
}).strict();

export const UnitUncheckedCreateInputSchema: z.ZodType<Prisma.UnitUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUnitInputSchema).optional()
}).strict();

export const UnitUpdateInputSchema: z.ZodType<Prisma.UnitUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Product: z.lazy(() => ProductUpdateManyWithoutUnitNestedInputSchema).optional()
}).strict();

export const UnitUncheckedUpdateInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Product: z.lazy(() => ProductUncheckedUpdateManyWithoutUnitNestedInputSchema).optional()
}).strict();

export const UnitCreateManyInputSchema: z.ZodType<Prisma.UnitCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UnitUpdateManyMutationInputSchema: z.ZodType<Prisma.UnitUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerCreateInputSchema: z.ZodType<Prisma.CustomerCreateInput> = z.object({
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutCustomerInputSchema).optional(),
  Product: z.lazy(() => ProductCreateNestedManyWithoutCustomerInputSchema).optional()
}).strict();

export const CustomerUncheckedCreateInputSchema: z.ZodType<Prisma.CustomerUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutCustomerInputSchema).optional(),
  Product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCustomerInputSchema).optional()
}).strict();

export const CustomerUpdateInputSchema: z.ZodType<Prisma.CustomerUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutCustomerNestedInputSchema).optional(),
  Product: z.lazy(() => ProductUpdateManyWithoutCustomerNestedInputSchema).optional()
}).strict();

export const CustomerUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomerUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutCustomerNestedInputSchema).optional(),
  Product: z.lazy(() => ProductUncheckedUpdateManyWithoutCustomerNestedInputSchema).optional()
}).strict();

export const CustomerCreateManyInputSchema: z.ZodType<Prisma.CustomerCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CustomerUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomerUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => UserRoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutCreatedByUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => UserRoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutCreatedByUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutCreatedByUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutCreatedByUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => UserRoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipmentCreateInputSchema: z.ZodType<Prisma.ShipmentCreateInput> = z.object({
  shipmentDate: z.coerce.date(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customer: z.lazy(() => CustomerCreateNestedOneWithoutShipmentsInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutShipmentsInputSchema),
  createdByUser: z.lazy(() => UserCreateNestedOneWithoutShipmentsInputSchema).optional()
}).strict();

export const ShipmentUncheckedCreateInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.number().int().optional().nullable()
}).strict();

export const ShipmentUpdateInputSchema: z.ZodType<Prisma.ShipmentUpdateInput> = z.object({
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customer: z.lazy(() => CustomerUpdateOneRequiredWithoutShipmentsNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutShipmentsNestedInputSchema).optional(),
  createdByUser: z.lazy(() => UserUpdateOneWithoutShipmentsNestedInputSchema).optional()
}).strict();

export const ShipmentUncheckedUpdateInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShipmentCreateManyInputSchema: z.ZodType<Prisma.ShipmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.number().int().optional().nullable()
}).strict();

export const ShipmentUpdateManyMutationInputSchema: z.ZodType<Prisma.ShipmentUpdateManyMutationInput> = z.object({
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UnitScalarRelationFilterSchema: z.ZodType<Prisma.UnitScalarRelationFilter> = z.object({
  is: z.lazy(() => UnitWhereInputSchema).optional(),
  isNot: z.lazy(() => UnitWhereInputSchema).optional()
}).strict();

export const CustomerScalarRelationFilterSchema: z.ZodType<Prisma.CustomerScalarRelationFilter> = z.object({
  is: z.lazy(() => CustomerWhereInputSchema).optional(),
  isNot: z.lazy(() => CustomerWhereInputSchema).optional()
}).strict();

export const ShipmentListRelationFilterSchema: z.ZodType<Prisma.ShipmentListRelationFilter> = z.object({
  every: z.lazy(() => ShipmentWhereInputSchema).optional(),
  some: z.lazy(() => ShipmentWhereInputSchema).optional(),
  none: z.lazy(() => ShipmentWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ShipmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShipmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  defaultLength: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.UnitCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UnitAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UnitMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.UnitMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UnitSumOrderByAggregateInputSchema: z.ZodType<Prisma.UnitSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CustomerCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CustomerSumOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumUserRoleFilterSchema: z.ZodType<Prisma.EnumUserRoleFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EnumShipmentStatusFilterSchema: z.ZodType<Prisma.EnumShipmentStatusFilter> = z.object({
  equals: z.lazy(() => ShipmentStatusSchema).optional(),
  in: z.lazy(() => ShipmentStatusSchema).array().optional(),
  notIn: z.lazy(() => ShipmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => NestedEnumShipmentStatusFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ProductScalarRelationFilterSchema: z.ZodType<Prisma.ProductScalarRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ShipmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShipmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shipmentDate: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  lotNumber: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShipmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShipmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shipmentDate: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  lotNumber: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShipmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shipmentDate: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  lotNumber: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShipmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShipmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumShipmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumShipmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ShipmentStatusSchema).optional(),
  in: z.lazy(() => ShipmentStatusSchema).array().optional(),
  notIn: z.lazy(() => ShipmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => NestedEnumShipmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumShipmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumShipmentStatusFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const UnitCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional()
}).strict();

export const CustomerCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.CustomerCreateNestedOneWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => CustomerCreateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CustomerCreateOrConnectWithoutProductInputSchema).optional(),
  connect: z.lazy(() => CustomerWhereUniqueInputSchema).optional()
}).strict();

export const ShipmentCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ShipmentCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutProductInputSchema),z.lazy(() => ShipmentCreateWithoutProductInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShipmentUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutProductInputSchema),z.lazy(() => ShipmentCreateWithoutProductInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UnitUpdateOneRequiredWithoutProductNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneRequiredWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutProductInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateToOneWithWhereWithoutProductInputSchema),z.lazy(() => UnitUpdateWithoutProductInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const CustomerUpdateOneRequiredWithoutProductNestedInputSchema: z.ZodType<Prisma.CustomerUpdateOneRequiredWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => CustomerCreateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CustomerCreateOrConnectWithoutProductInputSchema).optional(),
  upsert: z.lazy(() => CustomerUpsertWithoutProductInputSchema).optional(),
  connect: z.lazy(() => CustomerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CustomerUpdateToOneWithWhereWithoutProductInputSchema),z.lazy(() => CustomerUpdateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedUpdateWithoutProductInputSchema) ]).optional(),
}).strict();

export const ShipmentUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ShipmentUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutProductInputSchema),z.lazy(() => ShipmentCreateWithoutProductInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipmentUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ShipmentUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ShipmentUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutProductInputSchema),z.lazy(() => ShipmentCreateWithoutProductInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipmentUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ShipmentUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductCreateWithoutUnitInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShipmentCreateNestedManyWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentCreateNestedManyWithoutCustomerInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateWithoutCustomerInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCustomerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutCustomerInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutCustomerInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCustomerInputSchema),z.lazy(() => ProductCreateWithoutCustomerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCustomerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShipmentUncheckedCreateNestedManyWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateNestedManyWithoutCustomerInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateWithoutCustomerInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCustomerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutCustomerInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCustomerInputSchema),z.lazy(() => ProductCreateWithoutCustomerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCustomerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const ShipmentUpdateManyWithoutCustomerNestedInputSchema: z.ZodType<Prisma.ShipmentUpdateManyWithoutCustomerNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateWithoutCustomerInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCustomerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipmentUpdateManyWithWhereWithoutCustomerInputSchema),z.lazy(() => ShipmentUpdateManyWithWhereWithoutCustomerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutCustomerNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutCustomerNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCustomerInputSchema),z.lazy(() => ProductCreateWithoutCustomerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCustomerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCustomerInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCustomerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShipmentUncheckedUpdateManyWithoutCustomerNestedInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyWithoutCustomerNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateWithoutCustomerInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCustomerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipmentUpdateManyWithWhereWithoutCustomerInputSchema),z.lazy(() => ShipmentUpdateManyWithWhereWithoutCustomerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutCustomerNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCustomerNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCustomerInputSchema),z.lazy(() => ProductCreateWithoutCustomerInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCustomerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCustomerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCustomerInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCustomerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCustomerInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCustomerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShipmentCreateNestedManyWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentCreateNestedManyWithoutCreatedByUserInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCreatedByUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShipmentUncheckedCreateNestedManyWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateNestedManyWithoutCreatedByUserInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCreatedByUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserRoleSchema).optional()
}).strict();

export const ShipmentUpdateManyWithoutCreatedByUserNestedInputSchema: z.ZodType<Prisma.ShipmentUpdateManyWithoutCreatedByUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCreatedByUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCreatedByUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCreatedByUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipmentUpdateManyWithWhereWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUpdateManyWithWhereWithoutCreatedByUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShipmentUncheckedUpdateManyWithoutCreatedByUserNestedInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyWithoutCreatedByUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema).array(),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentCreateOrConnectWithoutCreatedByUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUpsertWithWhereUniqueWithoutCreatedByUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShipmentCreateManyCreatedByUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShipmentWhereUniqueInputSchema),z.lazy(() => ShipmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUpdateWithWhereUniqueWithoutCreatedByUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShipmentUpdateManyWithWhereWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUpdateManyWithWhereWithoutCreatedByUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CustomerCreateNestedOneWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerCreateNestedOneWithoutShipmentsInput> = z.object({
  create: z.union([ z.lazy(() => CustomerCreateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutShipmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CustomerCreateOrConnectWithoutShipmentsInputSchema).optional(),
  connect: z.lazy(() => CustomerWhereUniqueInputSchema).optional()
}).strict();

export const ProductCreateNestedOneWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutShipmentsInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutShipmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutShipmentsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutShipmentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutShipmentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutShipmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutShipmentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumShipmentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumShipmentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ShipmentStatusSchema).optional()
}).strict();

export const CustomerUpdateOneRequiredWithoutShipmentsNestedInputSchema: z.ZodType<Prisma.CustomerUpdateOneRequiredWithoutShipmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CustomerCreateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutShipmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CustomerCreateOrConnectWithoutShipmentsInputSchema).optional(),
  upsert: z.lazy(() => CustomerUpsertWithoutShipmentsInputSchema).optional(),
  connect: z.lazy(() => CustomerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CustomerUpdateToOneWithWhereWithoutShipmentsInputSchema),z.lazy(() => CustomerUpdateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedUpdateWithoutShipmentsInputSchema) ]).optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutShipmentsNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutShipmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutShipmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutShipmentsInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutShipmentsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutShipmentsInputSchema),z.lazy(() => ProductUpdateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutShipmentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutShipmentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutShipmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutShipmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutShipmentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutShipmentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutShipmentsInputSchema),z.lazy(() => UserUpdateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutShipmentsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserRoleSchema).optional(),
  in: z.lazy(() => UserRoleSchema).array().optional(),
  notIn: z.lazy(() => UserRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional()
}).strict();

export const NestedEnumShipmentStatusFilterSchema: z.ZodType<Prisma.NestedEnumShipmentStatusFilter> = z.object({
  equals: z.lazy(() => ShipmentStatusSchema).optional(),
  in: z.lazy(() => ShipmentStatusSchema).array().optional(),
  notIn: z.lazy(() => ShipmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => NestedEnumShipmentStatusFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumShipmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumShipmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ShipmentStatusSchema).optional(),
  in: z.lazy(() => ShipmentStatusSchema).array().optional(),
  notIn: z.lazy(() => ShipmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => NestedEnumShipmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumShipmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumShipmentStatusFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const UnitCreateWithoutProductInputSchema: z.ZodType<Prisma.UnitCreateWithoutProductInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UnitUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutProductInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UnitCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const CustomerCreateWithoutProductInputSchema: z.ZodType<Prisma.CustomerCreateWithoutProductInput> = z.object({
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutCustomerInputSchema).optional()
}).strict();

export const CustomerUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.CustomerUncheckedCreateWithoutProductInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutCustomerInputSchema).optional()
}).strict();

export const CustomerCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.CustomerCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => CustomerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CustomerCreateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ShipmentCreateWithoutProductInputSchema: z.ZodType<Prisma.ShipmentCreateWithoutProductInput> = z.object({
  shipmentDate: z.coerce.date(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customer: z.lazy(() => CustomerCreateNestedOneWithoutShipmentsInputSchema),
  createdByUser: z.lazy(() => UserCreateNestedOneWithoutShipmentsInputSchema).optional()
}).strict();

export const ShipmentUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateWithoutProductInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.number().int().optional().nullable()
}).strict();

export const ShipmentCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ShipmentCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShipmentCreateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ShipmentCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.ShipmentCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShipmentCreateManyProductInputSchema),z.lazy(() => ShipmentCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UnitUpsertWithoutProductInputSchema: z.ZodType<Prisma.UnitUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutProductInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutProductInputSchema),z.lazy(() => UnitUncheckedCreateWithoutProductInputSchema) ]),
  where: z.lazy(() => UnitWhereInputSchema).optional()
}).strict();

export const UnitUpdateToOneWithWhereWithoutProductInputSchema: z.ZodType<Prisma.UnitUpdateToOneWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => UnitWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UnitUpdateWithoutProductInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const UnitUpdateWithoutProductInputSchema: z.ZodType<Prisma.UnitUpdateWithoutProductInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CustomerUpsertWithoutProductInputSchema: z.ZodType<Prisma.CustomerUpsertWithoutProductInput> = z.object({
  update: z.union([ z.lazy(() => CustomerUpdateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => CustomerCreateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutProductInputSchema) ]),
  where: z.lazy(() => CustomerWhereInputSchema).optional()
}).strict();

export const CustomerUpdateToOneWithWhereWithoutProductInputSchema: z.ZodType<Prisma.CustomerUpdateToOneWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => CustomerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CustomerUpdateWithoutProductInputSchema),z.lazy(() => CustomerUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const CustomerUpdateWithoutProductInputSchema: z.ZodType<Prisma.CustomerUpdateWithoutProductInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutCustomerNestedInputSchema).optional()
}).strict();

export const CustomerUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.CustomerUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutCustomerNestedInputSchema).optional()
}).strict();

export const ShipmentUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShipmentUpdateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => ShipmentCreateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ShipmentUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShipmentUpdateWithoutProductInputSchema),z.lazy(() => ShipmentUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const ShipmentUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => ShipmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShipmentUpdateManyMutationInputSchema),z.lazy(() => ShipmentUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const ShipmentScalarWhereInputSchema: z.ZodType<Prisma.ShipmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShipmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShipmentScalarWhereInputSchema),z.lazy(() => ShipmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  shipmentDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  customerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  productId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lotNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumShipmentStatusFilterSchema),z.lazy(() => ShipmentStatusSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ProductCreateWithoutUnitInputSchema: z.ZodType<Prisma.ProductCreateWithoutUnitInput> = z.object({
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customer: z.lazy(() => CustomerCreateNestedOneWithoutProductInputSchema),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutUnitInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  customerId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const ProductCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyUnitInputSchema),z.lazy(() => ProductCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutUnitInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutUnitInputSchema) ]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  defaultLength: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  customerId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ShipmentCreateWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentCreateWithoutCustomerInput> = z.object({
  shipmentDate: z.coerce.date(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutShipmentsInputSchema),
  createdByUser: z.lazy(() => UserCreateNestedOneWithoutShipmentsInputSchema).optional()
}).strict();

export const ShipmentUncheckedCreateWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateWithoutCustomerInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.number().int().optional().nullable()
}).strict();

export const ShipmentCreateOrConnectWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentCreateOrConnectWithoutCustomerInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema) ]),
}).strict();

export const ShipmentCreateManyCustomerInputEnvelopeSchema: z.ZodType<Prisma.ShipmentCreateManyCustomerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShipmentCreateManyCustomerInputSchema),z.lazy(() => ShipmentCreateManyCustomerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductCreateWithoutCustomerInputSchema: z.ZodType<Prisma.ProductCreateWithoutCustomerInput> = z.object({
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutCustomerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  unitId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutCustomerInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCustomerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema) ]),
}).strict();

export const ProductCreateManyCustomerInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyCustomerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyCustomerInputSchema),z.lazy(() => ProductCreateManyCustomerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ShipmentUpsertWithWhereUniqueWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUpsertWithWhereUniqueWithoutCustomerInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShipmentUpdateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedUpdateWithoutCustomerInputSchema) ]),
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCustomerInputSchema) ]),
}).strict();

export const ShipmentUpdateWithWhereUniqueWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUpdateWithWhereUniqueWithoutCustomerInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShipmentUpdateWithoutCustomerInputSchema),z.lazy(() => ShipmentUncheckedUpdateWithoutCustomerInputSchema) ]),
}).strict();

export const ShipmentUpdateManyWithWhereWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUpdateManyWithWhereWithoutCustomerInput> = z.object({
  where: z.lazy(() => ShipmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShipmentUpdateManyMutationInputSchema),z.lazy(() => ShipmentUncheckedUpdateManyWithoutCustomerInputSchema) ]),
}).strict();

export const ProductUpsertWithWhereUniqueWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutCustomerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCustomerInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCustomerInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutCustomerInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutCustomerInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCustomerInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutCustomerInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutCustomerInputSchema) ]),
}).strict();

export const ShipmentCreateWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentCreateWithoutCreatedByUserInput> = z.object({
  shipmentDate: z.coerce.date(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customer: z.lazy(() => CustomerCreateNestedOneWithoutShipmentsInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutShipmentsInputSchema)
}).strict();

export const ShipmentUncheckedCreateWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUncheckedCreateWithoutCreatedByUserInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ShipmentCreateOrConnectWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentCreateOrConnectWithoutCreatedByUserInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema) ]),
}).strict();

export const ShipmentCreateManyCreatedByUserInputEnvelopeSchema: z.ZodType<Prisma.ShipmentCreateManyCreatedByUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShipmentCreateManyCreatedByUserInputSchema),z.lazy(() => ShipmentCreateManyCreatedByUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ShipmentUpsertWithWhereUniqueWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUpsertWithWhereUniqueWithoutCreatedByUserInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShipmentUpdateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedUpdateWithoutCreatedByUserInputSchema) ]),
  create: z.union([ z.lazy(() => ShipmentCreateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedCreateWithoutCreatedByUserInputSchema) ]),
}).strict();

export const ShipmentUpdateWithWhereUniqueWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUpdateWithWhereUniqueWithoutCreatedByUserInput> = z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShipmentUpdateWithoutCreatedByUserInputSchema),z.lazy(() => ShipmentUncheckedUpdateWithoutCreatedByUserInputSchema) ]),
}).strict();

export const ShipmentUpdateManyWithWhereWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUpdateManyWithWhereWithoutCreatedByUserInput> = z.object({
  where: z.lazy(() => ShipmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShipmentUpdateManyMutationInputSchema),z.lazy(() => ShipmentUncheckedUpdateManyWithoutCreatedByUserInputSchema) ]),
}).strict();

export const CustomerCreateWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerCreateWithoutShipmentsInput> = z.object({
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Product: z.lazy(() => ProductCreateNestedManyWithoutCustomerInputSchema).optional()
}).strict();

export const CustomerUncheckedCreateWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerUncheckedCreateWithoutShipmentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string(),
  postalCode: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCustomerInputSchema).optional()
}).strict();

export const CustomerCreateOrConnectWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerCreateOrConnectWithoutShipmentsInput> = z.object({
  where: z.lazy(() => CustomerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CustomerCreateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutShipmentsInputSchema) ]),
}).strict();

export const ProductCreateWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductCreateWithoutShipmentsInput> = z.object({
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutProductInputSchema),
  customer: z.lazy(() => CustomerCreateNestedOneWithoutProductInputSchema)
}).strict();

export const ProductUncheckedCreateWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutShipmentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  unitId: z.number().int(),
  customerId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductCreateOrConnectWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutShipmentsInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutShipmentsInputSchema) ]),
}).strict();

export const UserCreateWithoutShipmentsInputSchema: z.ZodType<Prisma.UserCreateWithoutShipmentsInput> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => UserRoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutShipmentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutShipmentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => UserRoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutShipmentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutShipmentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutShipmentsInputSchema) ]),
}).strict();

export const CustomerUpsertWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerUpsertWithoutShipmentsInput> = z.object({
  update: z.union([ z.lazy(() => CustomerUpdateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedUpdateWithoutShipmentsInputSchema) ]),
  create: z.union([ z.lazy(() => CustomerCreateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedCreateWithoutShipmentsInputSchema) ]),
  where: z.lazy(() => CustomerWhereInputSchema).optional()
}).strict();

export const CustomerUpdateToOneWithWhereWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerUpdateToOneWithWhereWithoutShipmentsInput> = z.object({
  where: z.lazy(() => CustomerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CustomerUpdateWithoutShipmentsInputSchema),z.lazy(() => CustomerUncheckedUpdateWithoutShipmentsInputSchema) ]),
}).strict();

export const CustomerUpdateWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerUpdateWithoutShipmentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Product: z.lazy(() => ProductUpdateManyWithoutCustomerNestedInputSchema).optional()
}).strict();

export const CustomerUncheckedUpdateWithoutShipmentsInputSchema: z.ZodType<Prisma.CustomerUncheckedUpdateWithoutShipmentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Product: z.lazy(() => ProductUncheckedUpdateManyWithoutCustomerNestedInputSchema).optional()
}).strict();

export const ProductUpsertWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductUpsertWithoutShipmentsInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutShipmentsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutShipmentsInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductUpdateToOneWithWhereWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutShipmentsInput> = z.object({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutShipmentsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutShipmentsInputSchema) ]),
}).strict();

export const ProductUpdateWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutShipmentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneRequiredWithoutProductNestedInputSchema).optional(),
  customer: z.lazy(() => CustomerUpdateOneRequiredWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutShipmentsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutShipmentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutShipmentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutShipmentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutShipmentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutShipmentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutShipmentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutShipmentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutShipmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutShipmentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutShipmentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutShipmentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutShipmentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutShipmentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => UserRoleSchema),z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipmentCreateManyProductInputSchema: z.ZodType<Prisma.ShipmentCreateManyProductInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.number().int().optional().nullable()
}).strict();

export const ShipmentUpdateWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUpdateWithoutProductInput> = z.object({
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customer: z.lazy(() => CustomerUpdateOneRequiredWithoutShipmentsNestedInputSchema).optional(),
  createdByUser: z.lazy(() => UserUpdateOneWithoutShipmentsNestedInputSchema).optional()
}).strict();

export const ShipmentUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShipmentUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyWithoutProductInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductCreateManyUnitInputSchema: z.ZodType<Prisma.ProductCreateManyUnitInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  customerId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductUpdateWithoutUnitInputSchema: z.ZodType<Prisma.ProductUpdateWithoutUnitInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customer: z.lazy(() => CustomerUpdateOneRequiredWithoutProductNestedInputSchema).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateManyWithoutUnitInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutUnitInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipmentCreateManyCustomerInputSchema: z.ZodType<Prisma.ShipmentCreateManyCustomerInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.number().int().optional().nullable()
}).strict();

export const ProductCreateManyCustomerInputSchema: z.ZodType<Prisma.ProductCreateManyCustomerInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  defaultLength: z.number().optional().nullable(),
  unitId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ShipmentUpdateWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUpdateWithoutCustomerInput> = z.object({
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutShipmentsNestedInputSchema).optional(),
  createdByUser: z.lazy(() => UserUpdateOneWithoutShipmentsNestedInputSchema).optional()
}).strict();

export const ShipmentUncheckedUpdateWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateWithoutCustomerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShipmentUncheckedUpdateManyWithoutCustomerInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyWithoutCustomerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductUpdateWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUpdateWithoutCustomerInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneRequiredWithoutProductNestedInputSchema).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutCustomerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateManyWithoutCustomerInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCustomerInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  defaultLength: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipmentCreateManyCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentCreateManyCreatedByUserInput> = z.object({
  id: z.number().int().optional(),
  shipmentDate: z.coerce.date(),
  customerId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  length: z.number(),
  lotNumber: z.string().optional().nullable(),
  status: z.lazy(() => ShipmentStatusSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ShipmentUpdateWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUpdateWithoutCreatedByUserInput> = z.object({
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customer: z.lazy(() => CustomerUpdateOneRequiredWithoutShipmentsNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutShipmentsNestedInputSchema).optional()
}).strict();

export const ShipmentUncheckedUpdateWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateWithoutCreatedByUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShipmentUncheckedUpdateManyWithoutCreatedByUserInputSchema: z.ZodType<Prisma.ShipmentUncheckedUpdateManyWithoutCreatedByUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shipmentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lotNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => ShipmentStatusSchema),z.lazy(() => EnumShipmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(),ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const UnitFindFirstArgsSchema: z.ZodType<Prisma.UnitFindFirstArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnitScalarFieldEnumSchema,UnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UnitFindFirstOrThrowArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnitScalarFieldEnumSchema,UnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UnitFindManyArgsSchema: z.ZodType<Prisma.UnitFindManyArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UnitScalarFieldEnumSchema,UnitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UnitAggregateArgsSchema: z.ZodType<Prisma.UnitAggregateArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UnitGroupByArgsSchema: z.ZodType<Prisma.UnitGroupByArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithAggregationInputSchema.array(),UnitOrderByWithAggregationInputSchema ]).optional(),
  by: UnitScalarFieldEnumSchema.array(),
  having: UnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UnitFindUniqueArgsSchema: z.ZodType<Prisma.UnitFindUniqueArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict() ;

export const UnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UnitFindUniqueOrThrowArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict() ;

export const CustomerFindFirstArgsSchema: z.ZodType<Prisma.CustomerFindFirstArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereInputSchema.optional(),
  orderBy: z.union([ CustomerOrderByWithRelationInputSchema.array(),CustomerOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CustomerScalarFieldEnumSchema,CustomerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CustomerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomerFindFirstOrThrowArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereInputSchema.optional(),
  orderBy: z.union([ CustomerOrderByWithRelationInputSchema.array(),CustomerOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CustomerScalarFieldEnumSchema,CustomerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CustomerFindManyArgsSchema: z.ZodType<Prisma.CustomerFindManyArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereInputSchema.optional(),
  orderBy: z.union([ CustomerOrderByWithRelationInputSchema.array(),CustomerOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CustomerScalarFieldEnumSchema,CustomerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CustomerAggregateArgsSchema: z.ZodType<Prisma.CustomerAggregateArgs> = z.object({
  where: CustomerWhereInputSchema.optional(),
  orderBy: z.union([ CustomerOrderByWithRelationInputSchema.array(),CustomerOrderByWithRelationInputSchema ]).optional(),
  cursor: CustomerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CustomerGroupByArgsSchema: z.ZodType<Prisma.CustomerGroupByArgs> = z.object({
  where: CustomerWhereInputSchema.optional(),
  orderBy: z.union([ CustomerOrderByWithAggregationInputSchema.array(),CustomerOrderByWithAggregationInputSchema ]).optional(),
  by: CustomerScalarFieldEnumSchema.array(),
  having: CustomerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CustomerFindUniqueArgsSchema: z.ZodType<Prisma.CustomerFindUniqueArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereUniqueInputSchema,
}).strict() ;

export const CustomerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomerFindUniqueOrThrowArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ShipmentFindFirstArgsSchema: z.ZodType<Prisma.ShipmentFindFirstArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereInputSchema.optional(),
  orderBy: z.union([ ShipmentOrderByWithRelationInputSchema.array(),ShipmentOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShipmentScalarFieldEnumSchema,ShipmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShipmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShipmentFindFirstOrThrowArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereInputSchema.optional(),
  orderBy: z.union([ ShipmentOrderByWithRelationInputSchema.array(),ShipmentOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShipmentScalarFieldEnumSchema,ShipmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShipmentFindManyArgsSchema: z.ZodType<Prisma.ShipmentFindManyArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereInputSchema.optional(),
  orderBy: z.union([ ShipmentOrderByWithRelationInputSchema.array(),ShipmentOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShipmentScalarFieldEnumSchema,ShipmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShipmentAggregateArgsSchema: z.ZodType<Prisma.ShipmentAggregateArgs> = z.object({
  where: ShipmentWhereInputSchema.optional(),
  orderBy: z.union([ ShipmentOrderByWithRelationInputSchema.array(),ShipmentOrderByWithRelationInputSchema ]).optional(),
  cursor: ShipmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShipmentGroupByArgsSchema: z.ZodType<Prisma.ShipmentGroupByArgs> = z.object({
  where: ShipmentWhereInputSchema.optional(),
  orderBy: z.union([ ShipmentOrderByWithAggregationInputSchema.array(),ShipmentOrderByWithAggregationInputSchema ]).optional(),
  by: ShipmentScalarFieldEnumSchema.array(),
  having: ShipmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShipmentFindUniqueArgsSchema: z.ZodType<Prisma.ShipmentFindUniqueArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereUniqueInputSchema,
}).strict() ;

export const ShipmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShipmentFindUniqueOrThrowArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereUniqueInputSchema,
}).strict() ;

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProductUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UnitCreateArgsSchema: z.ZodType<Prisma.UnitCreateArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  data: z.union([ UnitCreateInputSchema,UnitUncheckedCreateInputSchema ]),
}).strict() ;

export const UnitUpsertArgsSchema: z.ZodType<Prisma.UnitUpsertArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
  create: z.union([ UnitCreateInputSchema,UnitUncheckedCreateInputSchema ]),
  update: z.union([ UnitUpdateInputSchema,UnitUncheckedUpdateInputSchema ]),
}).strict() ;

export const UnitCreateManyArgsSchema: z.ZodType<Prisma.UnitCreateManyArgs> = z.object({
  data: z.union([ UnitCreateManyInputSchema,UnitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UnitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UnitCreateManyAndReturnArgs> = z.object({
  data: z.union([ UnitCreateManyInputSchema,UnitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UnitDeleteArgsSchema: z.ZodType<Prisma.UnitDeleteArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict() ;

export const UnitUpdateArgsSchema: z.ZodType<Prisma.UnitUpdateArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  data: z.union([ UnitUpdateInputSchema,UnitUncheckedUpdateInputSchema ]),
  where: UnitWhereUniqueInputSchema,
}).strict() ;

export const UnitUpdateManyArgsSchema: z.ZodType<Prisma.UnitUpdateManyArgs> = z.object({
  data: z.union([ UnitUpdateManyMutationInputSchema,UnitUncheckedUpdateManyInputSchema ]),
  where: UnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UnitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UnitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UnitUpdateManyMutationInputSchema,UnitUncheckedUpdateManyInputSchema ]),
  where: UnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UnitDeleteManyArgsSchema: z.ZodType<Prisma.UnitDeleteManyArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CustomerCreateArgsSchema: z.ZodType<Prisma.CustomerCreateArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  data: z.union([ CustomerCreateInputSchema,CustomerUncheckedCreateInputSchema ]),
}).strict() ;

export const CustomerUpsertArgsSchema: z.ZodType<Prisma.CustomerUpsertArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereUniqueInputSchema,
  create: z.union([ CustomerCreateInputSchema,CustomerUncheckedCreateInputSchema ]),
  update: z.union([ CustomerUpdateInputSchema,CustomerUncheckedUpdateInputSchema ]),
}).strict() ;

export const CustomerCreateManyArgsSchema: z.ZodType<Prisma.CustomerCreateManyArgs> = z.object({
  data: z.union([ CustomerCreateManyInputSchema,CustomerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CustomerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CustomerCreateManyAndReturnArgs> = z.object({
  data: z.union([ CustomerCreateManyInputSchema,CustomerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CustomerDeleteArgsSchema: z.ZodType<Prisma.CustomerDeleteArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  where: CustomerWhereUniqueInputSchema,
}).strict() ;

export const CustomerUpdateArgsSchema: z.ZodType<Prisma.CustomerUpdateArgs> = z.object({
  select: CustomerSelectSchema.optional(),
  include: CustomerIncludeSchema.optional(),
  data: z.union([ CustomerUpdateInputSchema,CustomerUncheckedUpdateInputSchema ]),
  where: CustomerWhereUniqueInputSchema,
}).strict() ;

export const CustomerUpdateManyArgsSchema: z.ZodType<Prisma.CustomerUpdateManyArgs> = z.object({
  data: z.union([ CustomerUpdateManyMutationInputSchema,CustomerUncheckedUpdateManyInputSchema ]),
  where: CustomerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CustomerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CustomerUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CustomerUpdateManyMutationInputSchema,CustomerUncheckedUpdateManyInputSchema ]),
  where: CustomerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CustomerDeleteManyArgsSchema: z.ZodType<Prisma.CustomerDeleteManyArgs> = z.object({
  where: CustomerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ShipmentCreateArgsSchema: z.ZodType<Prisma.ShipmentCreateArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  data: z.union([ ShipmentCreateInputSchema,ShipmentUncheckedCreateInputSchema ]),
}).strict() ;

export const ShipmentUpsertArgsSchema: z.ZodType<Prisma.ShipmentUpsertArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereUniqueInputSchema,
  create: z.union([ ShipmentCreateInputSchema,ShipmentUncheckedCreateInputSchema ]),
  update: z.union([ ShipmentUpdateInputSchema,ShipmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShipmentCreateManyArgsSchema: z.ZodType<Prisma.ShipmentCreateManyArgs> = z.object({
  data: z.union([ ShipmentCreateManyInputSchema,ShipmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ShipmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShipmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShipmentCreateManyInputSchema,ShipmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ShipmentDeleteArgsSchema: z.ZodType<Prisma.ShipmentDeleteArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  where: ShipmentWhereUniqueInputSchema,
}).strict() ;

export const ShipmentUpdateArgsSchema: z.ZodType<Prisma.ShipmentUpdateArgs> = z.object({
  select: ShipmentSelectSchema.optional(),
  include: ShipmentIncludeSchema.optional(),
  data: z.union([ ShipmentUpdateInputSchema,ShipmentUncheckedUpdateInputSchema ]),
  where: ShipmentWhereUniqueInputSchema,
}).strict() ;

export const ShipmentUpdateManyArgsSchema: z.ZodType<Prisma.ShipmentUpdateManyArgs> = z.object({
  data: z.union([ ShipmentUpdateManyMutationInputSchema,ShipmentUncheckedUpdateManyInputSchema ]),
  where: ShipmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ShipmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ShipmentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ShipmentUpdateManyMutationInputSchema,ShipmentUncheckedUpdateManyInputSchema ]),
  where: ShipmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ShipmentDeleteManyArgsSchema: z.ZodType<Prisma.ShipmentDeleteManyArgs> = z.object({
  where: ShipmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;