import { create } from "zustand";

export type IError = Record<string, string | null>;

export interface IProductFormErrorsState {
  errors: IError;
  setError: (field: keyof IError, errorMessage: string | null) => void;
  setEmptyErrors: () => void;
}

// 1. Store for title and description
interface ITitleDescriptionState {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

const useTitleDescriptionStore = create<ITitleDescriptionState>((set) => ({
  title: "",
  description: "",
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
}));

// 2. Store for mrp and mrl
interface IPricingState {
  mrp: number;
  mrl: number;
  setMrp: (mrp: number) => void;
  setMrl: (mrl: number) => void;
}

const usePricingStore = create<IPricingState>((set) => ({
  mrp: 0,
  mrl: 0,
  setMrp: (mrp) => set({ mrp }),
  setMrl: (mrl) => set({ mrl }),
}));

// 3. Store for links
export interface ProductLink {
  id: number;
  url: string;
}

interface ILinksState {
  links: ProductLink[];
  setLinks: (links: ProductLink[]) => void;
}

const useLinksStore = create<ILinksState>((set) => ({
  links: Array(5)
    .fill(1)
    .map((_, i) => ({ id: i, url: "" })),
  setLinks: (links) => set({ links }),
}));

// 4. Store for category
export interface Category {
  id: number;
  name: string;
  description: string;
}

interface ICategoryState {
  category: Category;
  setCategory: (category: Category) => void;
}

const useCategoryStore = create<ICategoryState>((set) => ({
  category: { id: 0, name: "", description: "" },
  setCategory: (category) => set({ category }),
}));

// 5. Store for image
export interface ProductImage {
  id: number;
  url: string;
  file: File | null;
}

interface IImageState {
  image: ProductImage | null;
  setImage: (image: ProductImage | null) => void;
}

const useImageStore = create<IImageState>((set) => ({
  image: { id: "", url: "", file: null },
  setImage: (image) => set({ image }),
}));

// 6. Store for images
interface IImagesState {
  images: ProductImage[];
  setImages: (images: ProductImage[]) => void;
}

const useImagesStore = create<IImagesState>((set) => ({
  images: Array(4)
    .fill(1)
    .map((_, i) => ({ id: i, url: "", file: null })),
  setImages: (images) => set({ images }),
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

// Export the individual stores
export {
  useTitleDescriptionStore,
  usePricingStore,
  useLinksStore,
  useCategoryStore,
  useImageStore,
  useImagesStore,
  useProductErrorsStore,
};
