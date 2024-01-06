'use client'

import Link from 'next/link'
import { logOut } from '@/actions/user'
import { siteInfo } from '@/configs/site'
import { ArrowLeft, LogOut, User2 } from 'lucide-react'

type TProps = {
  mobile?: boolean
  user: TUserSession
}

export default function Sidebar({ mobile, user }: TProps) {
  return (
    <div className='bg-primary h-full'>
      {!mobile && (
        <Link
          href='/'
          className='flex items-center gap-2 font-medium text-sm w-1/2 uppercase mb-4'
        >
          <ArrowLeft /> go home
        </Link>
      )}
      <div className='pt-4'>
        <div className='pl-4'>
          <User2
            className='bg-white text-primary size-12 lg:size-16 rounded-full p-2'
            strokeWidth={1}
          />
          <div className='mt-4'>
            <h1 className='text-light'>{user?.name}</h1>
            <p className='text-sm text-light opacity-80'>{user?.email}</p>
          </div>
        </div>
        <div className='mt-8'>
          {siteInfo.donorDashboardItem.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className='flex itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2 rounded-lg'
            >
              <item.icon strokeWidth={2} />
              {item.name}
            </Link>
          ))}
          <form action={logOut}>
            <button className='w-full flex itmes-center font-medium hover:bg-light/20 text-light px-4 py-2.5 lg:text-lg mb-4 gap-2 rounded-lg'>
              <LogOut />
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
