import { SET_STUDENT_DATA } from "./types";




export const SetStudentData = () => {
    debugger;
    return (dispatch, getState) => {
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_USER_LIST,
                    payload: responseJson
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
