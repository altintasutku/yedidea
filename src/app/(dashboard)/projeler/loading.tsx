import { Loader2Icon } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
       Sayfa Yükleniyor <Loader2Icon className='animate-spin' />
    </div>
  )
}

export default LoadingPage