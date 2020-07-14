export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS":
            return {
                items: action.payload, filteredItems: action.payload
            }
            case "FILTER_PRODUCTS_BY_SIZE":
                return {
                    ...state,
                    filteredItems: action.payload.items,
                        size: action.payload.size
                }
                case "SORT_PRODUCTS_BY_PRICE":
                    return {
                        ...state,
                        sort: action.payload.sort,
                            filteredItems: action.payload.items,
                    }
                    default:
                        return state;
    }
}