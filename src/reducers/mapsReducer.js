export default function mapsReducer(state = {firstAddress: "", secondAddress: "", transitMode: "driving", pointOfInterest: "cafe", businesses: []}, action) {
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
            debugger
            return {
                ...state,
                loading: true
            }

        case "FETCH_RESTAURANTS":
            debugger
            return {
                ...state,
                businesses: action.businesses,
                loading: false
            };

        default:
            return state;
    }
}