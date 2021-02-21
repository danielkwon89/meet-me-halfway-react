export default function mapsReducer(state = {firstAddress: "", secondAddress: "", transitMode: "driving", pointOfInterest: "restaurant"}, action) {
    switch (action.type) {

        case "FIND_MIDPOINT":
            debugger
            return {
                ...state,
                firstAddress: action.state.firstAddress,
                secondAddress: action.state.secondAddress,
                transitMode: action.state.transitMode,
                pointOfInterest: action.state.pointOfInterest
            }

        default:
            return state;
    }
}