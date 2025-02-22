interface review {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string
}

export interface product {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: string[],
  brand?: string,
  sku: string,
  weight: number,
  dimensions: { width: number, height: number, depth: number },
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: review[],
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
  },
  images: string[],
  thumbnail: string
}

export interface cartProduct{
  id: number;
  quantity: number;
  priceAfterDiscount: number;
}
