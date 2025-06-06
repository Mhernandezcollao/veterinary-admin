import { createContext, useReducer, useEffect, useState } from 'react';
import { authReducer } from './AuthReducer';
import type { AuthState, LoginData, RegisterData, User } from '../interfaces';
import { getUserLogged, login, register } from '../api/Api';
import { showToastError } from '../../core/helpers/ShowToastError';
import { showToastSuccess } from '../../core/helpers/ShowToastSuccess';

interface AuthContextProps {
	status: 'checking' | 'authenticated' | 'not-authenticated'
	token: string | null
	user: User | null
	loadingSignIn: boolean
	loadingSignUp: boolean
	loadUser: () => void
	signIn: (loginData: LoginData, remember: boolean) => void
	signUp: (registerData: RegisterData) => void
	logOut: () => void,
}

const authInitialState: AuthState = {
	status: 'checking',
	token: null,
	user: null
}

const STORAGE_KEY_TOKEN = '@STORAGE_KEY_TOKEN';
export const STORAGE_KEY_REMEMBER_EMAIL = '@STORAGE_KEY_REMEMBER_EMAIL';
export const STORAGE_KEY_REMEMBER_PASSWORD = '@STORAGE_KEY_REMEMBER_PASSWORD';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

	const [state, dispatch] = useReducer(authReducer, authInitialState);
	const [loadingSignIn, setLoadingSignIn] = useState(false);
	const [loadingSignUp, setLoadingSignUp] = useState(false);

	useEffect(() => {
		loadUser();
	}, []);
	
	const loadUser = async () => {
		const token = await localStorage.getItem(STORAGE_KEY_TOKEN);
		const viewWatched = await localStorage.getItem('video watched');

		if (viewWatched === undefined || viewWatched === null) {
			localStorage.setItem('video watched', 'false');
		}

		if (!token) return dispatch({ type: 'notAuthenticated' });

		try {
			const response: any = await getUserLogged();

			dispatch({
				type: 'signIn',
				payload: {
					token,
					user: response
				}
			});

		} catch (e: any) {
			await localStorage.removeItem(STORAGE_KEY_TOKEN);
			dispatch({ type: 'notAuthenticated' });
			showToastError("Error", e)
		}
	};

	const signIn = async (data: LoginData, remember: boolean) => {
		setLoadingSignIn(true);

		try {
			const login_response: any = await login(data);
			const { message, token } = login_response;
			await localStorage.setItem(STORAGE_KEY_TOKEN, token);
			const user: any = await getUserLogged();

			dispatch({
				type: 'signIn',
				payload: {
					token,
					user
				}
			});

			showToastSuccess("¡Bienvenid@!", message)
			setLoadingSignIn(false);

			if (remember) {
				localStorage.setItem(STORAGE_KEY_REMEMBER_EMAIL, data.email);
				localStorage.setItem(STORAGE_KEY_REMEMBER_PASSWORD, data.password);
			} else {
				localStorage.removeItem(STORAGE_KEY_REMEMBER_EMAIL);
				localStorage.removeItem(STORAGE_KEY_REMEMBER_PASSWORD);
			}

		} catch (e: any) {
			setLoadingSignIn(false);
            showToastError("Error", e)
		}
	};
	const signUp = async (data: RegisterData) => {
		setLoadingSignUp(true);

		try {
			const register_response: any = await register(data);
			const { message } = register_response;
			showToastSuccess("¡Bienvenid@!", message)
			setLoadingSignUp(false);
			return { success: true };

		} catch (e: any) {
			setLoadingSignUp(false);
            showToastError("Error", e)
		}
	};

	const logOut = () => {
		localStorage.removeItem(STORAGE_KEY_TOKEN);
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider value={{
			...state,
			loadingSignIn,
			loadingSignUp,
			loadUser,
			signIn,
			signUp,
			logOut
		}}>
			{children}
		</AuthContext.Provider>
	)
}