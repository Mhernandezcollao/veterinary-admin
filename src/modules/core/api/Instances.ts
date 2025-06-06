import axios from 'axios';

const Microservices = [
    { name: 'MS_AUTH', url: import.meta.env.VITE_MS_AUTH_URL },
    { name: 'MS_MATRIX', url: import.meta.env.VITE_MS_MATRIX_URL },
    { name: 'MS_TRANSACTION', url: import.meta.env.VITE_MS_TRANSACTION_URL },
    { name: 'MS_BIOMETRIC_EXTERNAL', url: import.meta.env.VITE_MS_BIOMETRIC_EXTERNAL_URL },
    { name: 'MS_EVENT', url: import.meta.env.VITE_MS_EVENT_URL }
];

const Instances: any = {};

for (let microservice of Microservices) {
    const { name, url } = microservice;
    Instances[name] = axios.create({ baseURL: url });
    Instances[name].interceptors.request.use(
        async (config: any) => {
            const token = await localStorage.getItem('@STORAGE_KEY_TOKEN');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }
    );
    // console.log(`[API] ${name} - ${url}`);
}

export { Instances };