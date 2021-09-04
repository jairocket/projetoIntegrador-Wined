import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from "js-cookie"

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){
    const signed = Cookie.get('token');

    if(!signed && isPrivate){
        return <Redirect to='/login' />
    }

    return (
        <Route
            {...rest}
            render = {props =>(
                <Component {...props} />
            )}
        />
    )
}