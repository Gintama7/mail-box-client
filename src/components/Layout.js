import React from 'react'
import { Fragment } from 'react'
import SiteNavbar from './SiteNavbar'


const Layout = (props) => {

 
  return (
   <Fragment >
    <SiteNavbar/>
    <main>{props.children}</main>
   </Fragment>
  )
}

export default Layout