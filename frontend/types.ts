export interface ProductData {
  _id: string;
  name: string;
  sku: string;
  hsn: string;
  price: string;
  gst: string;
  stock: string;
  organizationId: string;
  createdBy: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface InvoiceData {
  _id: string;
  orderDate: string;
  createdBy: string;
  customer: {
    _id: string;
    name: string;
    gstin: string;
    shop: string;
    phone: number;
    organizationId: string;
    created_at: string;
    updated_at: string;
    __v: number;
    email: string;
  };
  sentEmail: boolean;
  products: [{ product: ProductData; amount: number; _id: string }];
  organizationId: string;
  total: number;
  salesOrder: string;
  estimate: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
export interface SalesOrderData {
  _id: string;
  orderDate: string;
  createdBy: string;
  customer: {
    _id: string;
    name: string;
    gstin: string;
    shop: string;
    phone: number;
    organizationId: string;
    created_at: string;
    updated_at: string;
    __v: number;
    email: string;
  };
  sentEmail: boolean;
  products: [{ product: ProductData; amount: number; _id: string }];
  organizationId: string;
  total: number;
  invoice: string;
  estimate: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
