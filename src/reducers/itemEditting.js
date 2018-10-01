import * as types from './../constants/ActionTypes';

var initialState = {};

const itemEditting = (state = initialState, action) => {
    switch(action.type){
        case types.EDIT_PRODUCT:
            console.log(action.product);
            return action.product;
        default:
            return state;
    }
}

export default itemEditting;