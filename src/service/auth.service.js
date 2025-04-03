import { http, result } from "../api/AxiosClient"

export const authService = {
    register: async ({
        name,
        email,
        password
    }) => {
        const { post } = http;
        try {

            const response = await post('/api/auth/register', { name, email, password });;

            console.log(response.data);

            return result.ok(response.data)

        } catch (error) {
            
            return result.err('Ha ocurrido un error');
        }
    },
    login: async ({
        email,
        password
    }) => {
        const { post } = http;
        try {

            const response = await post('/api/auth/login', { email, password });;

            console.log(response.data);

            return result.ok(response.data)

        } catch (error) {

            return result.err('Ha ocurrido un error');
        }
    }
}