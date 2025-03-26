import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import FormDataQuery from './components/FormData'


function App() {


  return (
    <>
      <div className='h-screen w-full '>
        <div className='header justify-center  flex flex-row bg-white rounded-b-xl transition-all ease-in-out duration-300     p-4'>
          <Header />
        </div>
        <div className='components  flex flex-col bg-white w-auto transition-all ease-in-out duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]  h-5/6  m-8 rounded-xl '>
          <FormDataQuery />
        </div>
        <div className='px-8 text-center'>
          <span className='rounded-xl   bg-gray-50 p-2 text-green-800'>@ Footer</span>
        </div>
      </div>
    </>
  )
}

export default App
