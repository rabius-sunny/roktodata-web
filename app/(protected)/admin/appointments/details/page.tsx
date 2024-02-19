'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import requests from '@/services/network/http'
import dayjs from 'dayjs'

import useAsync from '@/lib/useAsync'

export default function AppointmentsDetails() {
  const searchParams = useSearchParams()
  const appId = searchParams.get('id')
  const { data, isLoading, error } = useAsync(
    `/api/admin/get-appointment?appId=${appId}`,
    requests.get
  )
  console.log('data', { data, isLoading, error })
  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div className='text-red-500 font-medium text-3xl text-center'>
        ইরর হয়েছে, আবার চেষ্টা করুন।
      </div>
    )
  return (
    <div>
      <h1 className='my-8 text-secondary'>আবেদনের বিস্তারিত</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
        <div className='col-auto'>
          <h2>ডোনারের তথ্য</h2>
          <hr className='mb-2' />
          <div className='grid gap-2'>
            <p>
              নাম :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.name}
              </span>
            </p>
            <p>
              জেলা :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.jilla}
              </span>
            </p>
            <p>
              উপজেলা :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.subJilla}
              </span>
            </p>
            <p>
              থানা :
              <span className='text-dark pl-2'>
                {data.appointment.donor.user.thana}
              </span>
            </p>
            <p>
              আইডেন্টিটি :
              <span className='text-secondary pl-2 text-xl font-medium'>
                {data.appointment.donor.user.identity}
              </span>
            </p>
          </div>
        </div>
        <div className='col-auto'>
          <h2>রিসিভারের তথ্য</h2>
          <hr className='mb-2' />
          <div className='grid gap-2'>
            <p>
              নাম :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.name}
              </span>
            </p>
            <p>
              জেলা :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.jilla}
              </span>
            </p>
            <p>
              উপজেলা :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.subJilla}
              </span>
            </p>
            <p>
              থানা :
              <span className='text-dark pl-2'>
                {data.appointment.receiver.thana}
              </span>
            </p>
            <p>
              আইডেন্টিটি :
              <span className='text-secondary pl-2 text-xl font-medium'>
                {data.appointment.receiver.identity}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <h2>আবেদনের তথ্য</h2>
      </div>
      <hr />
      <div className='mt-6'>
        <h3 className='font-medium'>
          আবেদনের সময় :
          <span className='text-secondary pl-4'>
            {dayjs(data.appointment.scheduledAt).format('D MMM, YYYY')}
          </span>
        </h3>
        <h3 className='font-medium mt-2'>হাসপাতালের ঠিকানা</h3>
        <p>{data.appointment.address}</p>
        <h3 className='font-medium mt-2'>হাসপাতালের বিষয়ে অন্যান্য তথ্য</h3>
        <p>{data.appointment.hospitalInfo}</p>
        <h3 className='font-medium mt-2'>অন্যান্য তথ্য</h3>
        <p>{data.appointment.additionalInfo}</p>
      </div>
      <div className='mt-6'>
        <h2>সংশ্লিষ্ট ফাইল</h2>
        <hr />
        <div className='mt-6'>
          {data.appointment.images.map((item: string, idx: number) => (
            <div className='grid gap-3'>
              <Image
                width={400}
                height={300}
                src={item}
                alt='file image'
                key={idx}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
