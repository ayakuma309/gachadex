import React from 'react'
import Link from 'next/link'

const Header:React.FC = () => {
  return (
    <nav className='left-0 z-50 block w-full bg-opacity-95 shadow-2xl'>
      <div className='mx-auto md:mx-20 xl:mx-44'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-start ml-3 sm:items-stretch sm:justify-start'>
            <div className='mr-16 flex flex-shrink-0 items-center hover:opacity-70 sm:mr-0'>
              <Link href='/'>
                <div className='block h-7 w-auto sm:ml-10 font-bold text-black'>
                  gachadex
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Header
