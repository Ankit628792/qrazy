export interface IBaseMenuItem {
  title: string
  icon: any
  link: string
}

export interface IMenuItem extends IBaseMenuItem {}

export interface IMenuBottomItem extends IBaseMenuItem {}
