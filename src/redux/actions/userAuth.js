export const loginUser = (data) => {
    return (dispatch) => {
        // console.log(data);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data,
        });
    };
};
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT_SUCCESS',
        });
    };
};
