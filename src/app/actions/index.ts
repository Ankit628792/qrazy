import { getCookie } from "@/hooks/cookies.hook";
import { me } from "@/services/auth.service";
// import { redirect } from "next/navigation";
import { jwtDecode } from 'jwt-decode'

function isTokenExpired(exp: number): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(exp, currentTimestamp)
    console.log(new Date(exp * 1000), new Date(currentTimestamp * 1000))
    return exp < currentTimestamp;
}

export async function checkTokenValidity() {
    const token = await getCookie('access_token');
    if (!token) {
        return true
    }

    const decoded = jwtDecode(token)
    const expired = isTokenExpired(decoded.exp as number);

    return expired;
}

export async function verifyToken() {
    let res: any;
    try {
        res = await me();
    } catch (error) {
        res = error
    }
    if (!res?.success) {
        // redirect('/login');
    }
    else {
        return res.data
    }
}
