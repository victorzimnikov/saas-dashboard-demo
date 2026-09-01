import type { Product } from "@saas-dashboard/contracts";

const productImage = (baseUrl: string, number: number): string =>
  `${baseUrl}assets/product-${number}.png`;

export const createProductMock = (data: Partial<Product>): Product => ({
  id: "1",
  name: "Test",
  price: 100,
  rating: 0,
  ...data,
});

export const createProductsListMock = (baseUrl: string): Product[] => [
  createProductMock({
    id: "1",
    image: productImage(baseUrl, 1),
    name: "NIKE Shoes Black Pattern",
    price: 8700,
    rating: 3,
  }),
  createProductMock({
    id: "2",
    image: productImage(baseUrl, 2),
    name: "iPhone 12",
    price: 98700,
    rating: 5,
  }),
  createProductMock({
    id: "3",
    image: productImage(baseUrl, 3),
    name: "Camera Lens",
    price: 17800,
    rating: 4,
  }),
  createProductMock({
    id: "4",
    image: productImage(baseUrl, 4),
    name: "Black Sleep Dress",
    price: 1400,
    rating: 4,
  }),
  createProductMock({
    id: "5",
    image: productImage(baseUrl, 5),
    name: "Argan Oil",
    price: 2100,
    rating: 4,
  }),
  createProductMock({
    id: "6",
    image: productImage(baseUrl, 6),
    name: "EAU DE Parfum",
    price: 3200,
    rating: 5,
  }),
];

export const createTopSellingProductsMock = (baseUrl: string): Product[] =>
  createProductsListMock(baseUrl).slice(0, 2);
