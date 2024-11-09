import { get, post } from "./HttpService";


export const login = (data: {
    email: string,
    password: string,
}) => post('/auth/login', { ...data, rememberMe: true });

export const register = (data: {
    email: string,
    password: string,
    name: string,
    lastname: string
}) => post('/auth/register', data);

export const emailVerify = (token: string) => get('/auth/email-verification/' + token);

export const forgotPassword = (data: {
    email: string
}) => post('/auth/forgot-password', data);

export const resetPassword = (data: {
    token: string,
    password: string,
    passwordConfirm: string
}) => post('/auth/reset-password/' + data.token, data);

export const updatePassword = (data: {
    oldPassword: string,
    password: string,
    passwordConfirm: string
}) => post('/auth/password', data)



export const resendEmailVerification = ({ email }: { email: string }) => get('/auth/resend-email-verification?email=' + email);

export const logout = () => get('/auth/logout');

export const me = () => get('/auth/me');
