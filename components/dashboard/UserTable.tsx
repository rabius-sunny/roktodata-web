'use client'

import { deleteUser, updateDonorProfile } from '@/actions/admin'
import { confirmAlertAsync } from '@/services/alerts/alerts'
import { MoreVertical } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import CMenu from '../customs/CMenu'

type TProps = {
  title: string
  data: TUser[] | undefined
  actionType: string
}

export default function UserTable({ title, data, actionType }: TProps) {
  return (
    <>
      <h1 className='text-center my-8 text-secondary'>{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>identity</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        {!data?.length && (
          <TableCaption>
            <h1 className='text-primary h-40 flex items-center justify-center'>
              কোনো ডাটা পাওয়া যায়নি।
            </h1>
          </TableCaption>
        )}
        <TableBody>
          {data?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className='min-w-40'>{item.name}</TableCell>
              <TableCell>{item.bloodType}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.identity}</TableCell>
              <TableCell className='w-20'>
                <CMenu
                  trigger={<MoreVertical />}
                  actions={requestActions(item, actionType)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>{/** @TODO Add Pagination here */}</TableFooter>
      </Table>
    </>
  )
}

const requestActions = (item: TUser, actionType: string) => {
  if (actionType === 'requests')
    return [
      {
        name: 'accept',
        action: () =>
          confirmAlertAsync({
            title: 'রিকুয়েস্টটি কনফার্ম করতে চান?',
            body: 'রিকুয়েস্টটি কনফার্ম করা হলে উক্ত ডোনারের একটি প্রোফাইল তৈরি হবে।',
            precom: () =>
              updateDonorProfile({
                bloodType: item.bloodType,
                userId: item.id,
                action: 'ACCEPTED'
              }),
            successText: 'সফলভাবে ডোনার ক্রিয়েট হয়েছে।'
          })
      },
      {
        name: 'reject',
        action: () =>
          confirmAlertAsync({
            title: 'রিকুয়েস্টটি বাতিল করতে চান?',
            body: 'রিকুয়েস্টটি বাতিল করা হলে উক্ত ডোনারের কোনো প্রোফাইল তৈরি হবে না।',
            precom: () =>
              updateDonorProfile({
                bloodType: item.bloodType,
                userId: item.id,
                action: 'REJECTED'
              }),
            successText: 'রিকুয়েস্টটি বাতিল করা হয়েছে।'
          })
      }
    ]
  else
    return [
      {
        name: 'delete user',
        action: () =>
          confirmAlertAsync({
            title: 'ডোনারকে ডিলিট করতে চান?',
            body: 'ডোনার ডিলিট করা হলে ডোনারের সকল তথ্য মুছে যাবে।',
            precom: () => deleteUser(item.id)
          })
      }
    ]
}
