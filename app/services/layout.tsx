import NavigationBar from '@/components/shared/navbar'
import { getMe } from '@/service/getMe';

import React from 'react'

const ServicesLayout = async(
    {
        children
    }:{
        children: React.ReactNode
    }) => {
  
        const user = await getMe();

  return (
    <div>
       
        <NavigationBar user={user} />
        {children}
    </div>
  )
}

export default ServicesLayout