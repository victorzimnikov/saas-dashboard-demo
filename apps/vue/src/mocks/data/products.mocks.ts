import type { Product } from "@/types";

const productImage = (number: number): string =>
  `${import.meta.env.BASE_URL}assets/product-${number}.png`;

export const createProductMock = (data: Partial<Product>): Product => ({
  id: "1",
  name: "Test",
  price: 100,
  rating: 0,
  ...data,
});

export const createProductsListMock = (): Product[] => [
  createProductMock({
    id: "1",
    image: productImage(1),
    name: "NIKE Shoes Black Pattern",
    price: 8700,
    rating: 3,
  }),
  createProductMock({
    id: "2",
    image: productImage(2),
    name: "iPhone 12",
    price: 98700,
    rating: 5,
  }),
  createProductMock({
    id: "3",
    image: productImage(3),
    name: "Camera Lens",
    price: 17800,
    rating: 4,
  }),
  createProductMock({
    id: "4",
    image: productImage(4),
    name: "Black Sleep Dress",
    price: 1400,
    rating: 4,
  }),
  createProductMock({
    id: "5",
    image: productImage(5),
    name: "Argan Oil",
    price: 2100,
    rating: 4,
  }),
  createProductMock({
    id: "6",
    image: productImage(6),
    name: "EAU DE Parfum",
    price: 3200,
    rating: 5,
  }),
];

export const createTopSellingProductsMock = (): Product[] => createProductsListMock().slice(0, 2);
