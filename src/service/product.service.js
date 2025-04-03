import { http, result } from "../api/AxiosClient"

export const productService = {
    getProducts: async () => {
        const { get } = http;
        try {

            const response = await get('/api/product/getProducts');

            return result.ok(response.data)

        } catch (error) {
            
            return result.err('Ha ocurrido un error');
        }
    },
    
    getProductById: async ({id}) => {
        const { get } = http;
        try {

            const response = await get(`/api/product/getProductById/${id}`);

            return result.ok(response.data)

        } catch (error) {
            
            return result.err('Ha ocurrido un error');
        }
    },

    createProduct: async ({
        description,
        quantity,
        user_id
    }) => {
        const { post } = http;
        try {

            const response = await post(`/api/product/create`, {
                description,
                quantity,
                user_id
            });

            return result.ok(response.data)

        } catch (error) {
            
            return result.err('Ha ocurrido un error');
        }
    },
    
    modifyProduct: async ({id, description, quantity }) => {
        const { put } = http;
        try {

            const response = await put(`/api/product/update/${id}`, {
                description,
                quantity
            });

            return result.ok(response.data)

        } catch (error) {
            
            return result.err('Ha ocurrido un error');
        }
    },
    
    deleteProduct: async ({id}) => {
        const { remove } = http;
        try {
            console.log(id)
            const response = await remove(`/api/product/delete/${id}`);

            return result.ok(response.data)

        } catch (error) {
            
            return result.err('Ha ocurrido un error');
        }
    },
}