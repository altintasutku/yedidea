import LoginForm from '@/components/Auth/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <main className='h-screen w-screen grid md:grid-cols-2 lg:grid-cols-3 bg-gradient-to-tr from-[#0B2B7D] to-70% to-[#020817] text-white'>
      <div className='grid'>
        <div className='flex flex-col justify-center items-center'>
          <span className='text-xl'>Hoş Geldiniz!</span>
          <h1 className='text-6xl font-bold'>YEDIDEA</h1>
          <span className='text-2xl'>Yönetim Sistemi</span>
        </div>
        <div>

        </div>
      </div>
      <div className='hidden lg:block'></div>
      <div className='flex flex-col justify-center items-center'>
        <LoginForm />
        <span className='text-muted-foreground text-sm text-center'>for support contact with us <br />support@dualsofts.com</span>
      </div>
    </main>
  )
}

export default LoginPage