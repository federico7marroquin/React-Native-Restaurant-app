import * as ActionTypes from './ActionTypes';

export const comments = (state = {
        errMess: null,
        comments: []
    },action) => {
        switch(action.type){
            case ActionTypes.ADD_COMMMENTS:
                return {...state,  errMess: null, comments: action.payload}

            case ActionTypes.COMMENTS_FAILED:
                return { ...state,  errMess: action.payload, comments:[]}  
            
            case ActionTypes.ADD_COMMENT:
                action.payload["id"]=state.comments.length
                state.comments.push(action.payload)
                return {...state, errMess: null, comments: state.comments}

            default:
                return state;
        
        }
    }
