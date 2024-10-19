"use client"
import { createRef, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import validator from "validator";

const API_URL = "https://api.domain.com/api/v1"

const key = process.env.AK_KEY as string;
export function encrypt(message: string) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        const charCode = char.charCodeAt(0);
        const keyCharCode = key.charCodeAt(i % key.length); // Retrieve the character code of the key at the corresponding position
        const encryptedCharCode = (charCode + keyCharCode) % 256; // Perform simple shift using the key value
        const encryptedChar = String.fromCharCode(encryptedCharCode);
        encryptedMessage += encryptedChar;
    }
    return encryptedMessage;
}

export const API = API_URL
export const getToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : "";
export const setToken = (token: string) => localStorage.setItem('access_token', token);
export const removeToken = () => localStorage.removeItem('access_token');

export const groupBy = (x: any[], f: (args: any) => void) => (Array.isArray(x) && typeof f === 'function') ? x.reduce((a, b) => ((a[f(b) as unknown as number] ||= []).push(b), a), {}) : {};

export const fetchPlace = async (text: string) => {
    try {
        const res = await fetch(
            `https://api.aqqess.me/api/location?search=${text}`
        );
        if (!res.ok) throw new Error(res.statusText);

        return res.json();
    } catch (err) {
        return { error: "Unable to retrieve places", err };
    }
};

export function isValidPassword(str: string) {
    let error = ''
    // Check if the string contains at least one capital letter
    const containsCapitalLetter = /[A-Z]/.test(str);
    if (!containsCapitalLetter) {
        error = "Password must contain a capital letter"
    }

    // Check if the string contains at least one special character
    const containsSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(str);
    if (!containsSpecialCharacter) {
        error = "Password must contain a special character"
    }

    // Check if the string contains at least one special character
    const containsNumber = /\d/.test(str);
    if (!containsNumber) {
        error = "Password must contain a number"
    }

    // Check if the string meets the minimum length requirement
    const hasMinimumLength = validator.isLength(str, { min: 6 });
    if (!hasMinimumLength) {
        error = "Password must be at least 6 character"
    }

    // Return true if all conditions are met, otherwise return false
    return {
        valid: containsCapitalLetter && containsSpecialCharacter && hasMinimumLength && containsNumber,
        error: error
    }
}

export const showError = (msg: string) => {
    toast.error(msg, { id: 'error' })
}
export const showSuccess = (msg: string) => {
    toast.success(msg, { id: 'success' })
}
export const showInfo = (msg: string) => {
    toast.success(msg, { id: 'info' })
}

export const openLink = (link: string) => {
    if (!link?.substring(0, 4)?.includes('http')) {
        link = 'https://' + link
    }
    return window.open(link, '_blank')
}


export const useClickOutside = (handler: any, ref: any, outerRef?: any) => {
    const domRef = ref || createRef();

    useEffect(() => {
        const localHandler = (e: any) => {
            if (!domRef.current) return;
            if (!domRef.current?.contains(e.target)) {
                if (outerRef && outerRef.current?.contains(e.target)) {
                    handler();
                }
                else {
                    handler()
                }
            }
        };
        document.addEventListener("mousedown", localHandler);
        return () => document.removeEventListener("mousedown", localHandler);
    }, [domRef, handler]);

    return domRef;
};


export default function useDebounce(value: any, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debouncedValue;
}


export const fetchLocation = async (loc: string) => {
    let res: any = await fetch('https://api.aqqess.me/api/location?search=' + loc?.toLowerCase());
    if (res.status === 200) {
        res = await res.json();
        return res.data;
    }
    else
        return []
}

export function getFavicon(url: string) {
    if (!url) return '';
    let domain = url.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
    domain = domain.split('/')[0];

    const icon = 'https://www.' + domain + '/favicon.ico';

    return icon
}


export const decodeToken = () => {
    if (!getToken) {
        return false;
    }
    var decoded: any = jwtDecode(getToken);
    return decoded?.userInfo
}

export const formattedDifference = (hours: number, minutes: number) => `${hours.toString().padStart(2, '0')} Hr ${minutes.toString().padStart(2, '0')} Mins`;
export const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getSum = (arr: any[], property: string) => Array.isArray(arr) ? arr.reduce((sum, item) => sum + (isNaN(Number(item[property])) ? 0 : Number(item[property])), 0) : 0;
export const getObjectWithMaxValue = (arr: any[], fieldName: string) => Array.isArray(arr) ? arr.reduce((max, obj) => (Number(obj[fieldName]) > (max ? Number(max[fieldName]) : -Infinity) ? obj : max), null) : {};

export function getRandomTime() {
    const randomHour = Math.floor(Math.random() * 12) + 1;
    const randomMinute = Math.floor(Math.random() * 60);
    const ampm = Math.random() < 0.5 ? 'AM' : 'PM';

    const formattedHour = randomHour < 10 ? `0${randomHour}` : `${randomHour}`;
    const formattedMinute = randomMinute < 10 ? `0${randomMinute}` : `${randomMinute}`;

    return `${formattedHour}:${formattedMinute} ${ampm}`;
}

export function formatNumber(value: number | bigint | Intl.StringNumericLiteral) {
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    });

    return formatter.format(value);
}

export function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Good Afternoon!';
    } else if (currentHour >= 18 && currentHour < 24) {
        return 'Good Evening!';
    } else {
        return 'Good Night!';
    }
}

export const getRandomNumber = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min + 1)) + min;