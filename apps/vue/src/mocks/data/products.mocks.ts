import type { Product } from "@/types";

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
    image: "/assets/product-1.png",
    name: "NIKE Shoes Black Pattern",
    price: 8700,
    rating: 3,
  }),
  createProductMock({
    id: "2",
    image: "/assets/product-2.png",
    name: "iPhone 12",
    price: 98700,
    rating: 5,
  }),
  createProductMock({
    id: "3",
    image: "/assets/product-3.png",
    name: "Camera Lens",
    price: 17800,
    rating: 4,
  }),
  createProductMock({
    id: "4",
    image: "/assets/product-4.png",
    name: "Black Sleep Dress",
    price: 1400,
    rating: 4,
  }),
  createProductMock({
    id: "5",
    image: "/assets/product-5.png",
    name: "Argan Oil",
    price: 2100,
    rating: 4,
  }),
  createProductMock({
    id: "6",
    image: "/assets/product-6.png",
    name: "EAU DE Parfum",
    price: 3200,
    rating: 5,
  }),
];

export const createTopSellingProductsMock = (): Product[] => createProductsListMock().slice(0, 2);
