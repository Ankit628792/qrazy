"use client"
import { ROUTES } from "@/lib/constants"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Navigation = () => {
    return (
        <NavigationMenu className="hidden md:inline-block">
            <NavigationMenuList className=' gap-2 lg:gap-5'>
                {
                    ROUTES.map((route: string) => <NavItem key={route} route={route} />)
                }
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navigation

const NavItem = ({ route }: { route: string }) => {
    const pathname = usePathname()
    return (
        <Link href={"/" + route.toLowerCase()}>
            <NavigationMenuItem className={'menu-item ' + (pathname?.includes("/" + route.toLowerCase()) ? "active" : "")}>
                {route}
            </NavigationMenuItem>
        </Link>
    )
}