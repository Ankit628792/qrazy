import { create } from "zustand";

export type IError = Record<string, string | null>;

export interface IProductFormDetailsState {
  title: string;
  description: string;
  mrp: number;
  mrl: number;
  links: ProductLink[];
  category: Category;
  image: ProductImage | null;
  images: ProductImage[] | [];

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setMrp: (mrp: number) => void;
  setMrl: (mrl: number) => void;
  setLinks: (links: ProductLink[]) => void;
  setCategory: (category: Category) => void;
  setImage: (image: ProductImage | null) => void;
  setImages: (images: ProductImage[]) => void;
}

export interface IProductFormErrorsState {
  errors: IError;

  setError: (field: keyof IError, errorMessage: string | null) => void;
  setEmptyErrors: () => void;
}

const useProductDetailsStore = create<IProductFormDetailsState>((set) => ({
  title: "",
  description: "",
  mrp: 0,
  mrl: 0,
  links: Array(5)
    .fill(1)
    .map((_, i) => ({ id: i, url: "" })),
  category: {
    id: 0,
    name: "",
    description: "",
  },
  image: {
    id: "",
    url: "",
    file: null,
  },
  images: Array(4)
    .fill(1)
    .map((_, i) => ({
      id: i,
      url: "",
      file: null,
    })),

  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setMrp: (mrp: number) => set({ mrp }),
  setMrl: (mrl: number) => set({ mrl }),
  setLinks: (links: ProductLink[]) => set({ links }),
  setCategory: (category: Category) => set({ category }),
  setImage: (image: ProductImage | null) => set({ image }),
  setImages: (images: ProductImage[]) => set({ images }),
}));

const useProductErrorsStore = create<IProductFormErrorsState>((set) => ({
  errors: {
    title: null,
    description: null,
    mrp: null,
    mrl: null,
    links: null,
    category: null,
    image: null,
    images: null,
  },

  setError: (field: keyof IError, errorMessage: string | null) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [field]: errorMessage,
      },
    })),
  setEmptyErrors: () =>
    set((state) => ({
      errors: {
        title: null,
        description: null,
        mrp: null,
        mrl: null,
        links: null,
        category: null,
        image: null,
        images: null,
      },
    })),
}));

export { useProductDetailsStore, useProductErrorsStore };
