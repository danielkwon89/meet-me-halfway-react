export default function mapsReducer(state = {firstAddress: "", secondAddress: "", transitMode: "driving", pointOfInterest: "cafe", businesses: [], renderBusiness: false, business: ""}, action) {
    switch (action.type) {

        case "ADD_ADDRESSES":
            return {
                ...state,
                firstAddress: action.state.firstAddress,
                secondAddress: action.state.secondAddress,
                transitMode: action.state.transitMode,
                pointOfInterest: action.state.pointOfInterest
            }

        case "LOADING_RESTAURANTS":
            return {
                ...state,
                loading: true
            }

        case "FETCH_RESTAURANTS":
            return {
                ...state,
                businesses: action.businesses,
                loading: false
            };
        
        case "RENDER_BUSINESS":
            debugger
            return {
                ...state,
                renderBusiness: true
            }

        case "RENDER_BUSINESSES":
            return {
                ...state,
                renderBusiness: false
            }

        case "SELECTED_BUSINESS":
            debugger
            return {
                ...state,
                business: action.business
            }

        default:
            return state;
    }
}