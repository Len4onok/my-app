import { operationsApi } from "../api/api";

let SET_OPERATIONS='SET_OPERATIONS';
let SET_CURRENT_PAGE='SET_CURRENT_PAGE';
let SET_TOTAL_COUNT='SET_TOTAL_COUNT';
let SET_FILTER_DATA='SET_FILTER_DATA';

let initialState = {
    headers: [{ id:'1', date: 'Дата', name: 'Название', quantity: 'Количество', distance: 'Расстояние' }],
    operations: [],
    totalCount: 30,
    currentPage: 1,
    itemsOnPage: 5,
    column: 'name',
    condition: 'includes',
    searchField: '',
}

const logisticTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPERATIONS:
            return {
                ...state, operations: action.operations
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case SET_FILTER_DATA:
            return {
                ...state,
                column: action.column,
                condition: action.condition,
                searchField: action.searchField,
                } 

        default:
            return state;
    }
}


export const setOperations = (operations) =>
({
    type: SET_OPERATIONS,
    operations,
})

export const setCurrentPage = (currentPage) =>
({
    type: SET_CURRENT_PAGE,
    currentPage,
})

export const setTotalCount = (totalCount) =>
({
    type: SET_TOTAL_COUNT,
    totalCount,
})

export const setFilterData = (column, condition, searchField) =>
({
    type: SET_FILTER_DATA,
    column,
    condition,
    searchField
})


export const getOperations = (itemsOnPage, currentPage, column, condition, searchField) => {
    return (dispatch) => {
        let data = operationsApi.getOperations(itemsOnPage, currentPage, column, condition, searchField)
        dispatch(setOperations(data.operations));
        dispatch(setTotalCount(data.totalCount));
        dispatch(setFilterData(column, condition, searchField))
    }
}

export default logisticTableReducer;