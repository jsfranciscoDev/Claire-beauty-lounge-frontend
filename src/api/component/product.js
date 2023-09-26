import api from '../api'

export default {
    createProduct(payload){
        return api.post('/api/create-product', payload);
    },
    getProducts(page){
        return api.get(`/api/get-products?page=${page}`);
    },
    deleteProduct(id){
        return api.delete(`/api/remove-product/${id}`);
    },
    updateProducts(data){
        return api.put('/api/update-product', data);
    }
}