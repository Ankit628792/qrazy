import React from 'react'

type ReturnVoid = () => void

export interface IUseOutsideClick {
  (ref: React.RefObject<HTMLElement>, callback: ReturnVoid): void
}

export interface IUseDebounce {
  (value: string, delay: number): string
}

export interface IUseFetch<T> {
  data: T | null
  loading: boolean
  error: unknown | null
}

export interface IUseHover {
  (ref: React.RefObject<HTMLElement>): boolean
}

export interface IUseInfiniteScroll {
  (callback: ReturnVoid): {
    scrollRef: React.RefObject<HTMLDivElement>
    isFetching: boolean
  }
}

export interface IUseIntersectionObserver {
  (
    elementRef: React.RefObject<HTMLElement>,
    options: IntersectionObserverInit
  ): IntersectionObserverEntry | null
}

export interface IUseKeyPress {
  (targetKey: string, callback: ReturnVoid): void
}

export type FormContextType = {
  formData: Record<string, any>
  errors: Record<string, string>
  validate: () => boolean
  setFormData: (data: Record<string, any>) => void
  setErrors: (errors: Record<string, string>) => void
  handleInputChange: (name: string, value: any) => void
  handleSubmit: (e: React.FormEvent) => void
}
