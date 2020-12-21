import {useSelector} from 'react-redux';

export const setFormValue = (name, value) => {
    return dispatch => {
        dispatch({
            type: 'form/setFormValue',
            fieldName: name,
            fieldValue: value
        });
    }
}

export const rowSelectionIds = (check, id) => {
    return dispatch => {
        dispatch({
            type: 'grid/selectionIds',
            check: check,
            id: id
        });
    }
}


export const rowSelectionAll = (check) => {
    return dispatch => {
        dispatch({
            type: 'grid/selectionIdsAll',
            check: check
        });
    }
}

export const deleteSelection = () => {
    return dispatch => {
        dispatch({
            type: 'grid/deleteSelection'
        });
    }
}

export const deleteApplicant = data => {
    return dispatch => {
        dispatch({
            type: 'grid/deleteApplicant',
            payload: data
        });
    }
}

export const initFormValue = () => {
    return dispatch => {
        dispatch({
            type: 'form/initFormValue'
        });
    }
}


export const loadApplicant = () =>{
    const storeName = 'applicant';
    return dispatch =>{
        let storeData = localStorage.getItem(storeName);
        if(storeData){
            let data = JSON.parse(storeData);
            dispatch({
                type: 'reg/loadApplicant',
                payload: data
            });
        }
    }
}


export const saveApplicant = data => {
    return dispatch => {
        dispatch({
            type: 'reg/addOrUpdateApplicant',
            payload: data
        });
        
    }
}



export const loadDataForEdit = data => {
    return dispatch => {
        dispatch({
            type: 'reg/editApplicant',
            payload: data
        });
    }
}
