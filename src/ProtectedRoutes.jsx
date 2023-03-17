import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Route , Redirect } from 'react-router-dom'

// export default function ProtectedRoutes({auth , component : Component , ...rest}) {
export default function ProtectedRoutes(props) {
    const { Component} = props;
    const navigate = useNavigate()
    useEffect(() =>{
        let user = localStorage.getItem('user')
        if(!user){
            navigate('/')
        }
    })
    
  return (
    <>
    <Component/>
    </>
    // <Route {...rest} render={(props) =>{
    //     if(auth) return <Component {...props}/>
    //     if(!auth) return <Redirect to={{path:"/" , state : {from : props.location}}}/>
    // }}/>
  )
}
