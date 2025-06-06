
import { Instances } from "../../core/api/Instances";
import { rejectApiError } from "../../core/helpers/RejectApiError";
import type { LoginData, RegisterData } from "../interfaces";

const login = (data: LoginData) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/login', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const register = (data: RegisterData) => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.post('/api/auth/register', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}

const getUserLogged = () => {
    return new Promise((resolve, reject) => {
        Instances.MS_AUTH.get('/api/auth/me')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
}


export {
    login,
    register,
    getUserLogged,
}