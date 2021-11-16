import React from 'react';
import Cookie from 'universal-cookie';
import { Navigate, Route } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
    const auth = {
        user: 'hello',
    };
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Navigate
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;
