import * as types from './../constants/ActionTypes';
import apiHelper from './../utils/apiHelper';

export const actFetchProductsRequest = ()=>{
    return (dispatch) =>{
        return apiHelper('products', 'GET',null).then(res =>{
            dispatch(actFetchProducts(res.data));
        });
    }
}
export const actFetchProducts = (products) =>{
    return {
        type: types.FETCH_PRODUCT,
        products
    }
}

export const actDeleteProductRequest = (id) => {
    return dispatch => {
        return apiHelper(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteProduct(id));
        })
    }
}

export const actDeleteProduct = (id) =>{
    return {
        type: types.DELETE_PRODUCT,
        id
    }
}

export const atcAddProductRequest = (product) => {
    return dispatch => {
        return apiHelper('products', 'POST', product).then(res => {
            dispatch(atcAddProduct(res.data))
        })
    }
}

export const atcAddProduct = (product) =>{
    return {
        type: types.ADD_PRODUCT,
        product
    }
}

export const actGetProductRequest = (id) =>{
    return dispatch => {
        return apiHelper(`products/${id}`, 'GET', null).then(res => {
            dispatch(actGetProduct(res.data));
        })
    }
}

export const actGetProduct = (product) =>{
    return {
        type: types.EDIT_PRODUCT,
        product
    }
}

export const actUpdateProductRequest = (product) =>{
    return dispatch => {
        return apiHelper(`products/${product.id}`, 'PUT', product).then(res =>{
            dispatch(actUpdateProduct(res.data));
        })
    }
}

export const actUpdateProduct = (product) =>{
    return{
        type: types.UPDATE_PRODUCT,
        product
    }
}