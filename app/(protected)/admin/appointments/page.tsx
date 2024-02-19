import Link from 'next/link'
import { getAppointments } from '@/actions/others'
import dayjs from 'dayjs'
import { ArrowRight, MoreVertical } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import CMenu from '@/components/customs/CMenu'

export default async function Applications() {
  const { data } = await getAppointments()
  return (
    <div>
      <h1 className='text-center my-8 text-secondary'>সকল আবেদন</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-40'>Donor</TableHead>
            <TableHead className='min-w-40'>Receiver</TableHead>
            <TableHead>Schedule</TableHead>
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
          {data.map(
            (
              { id, donor, receiver, scheduledAt }: TAppointment,
              idx: number
            ) => (
              <TableRow key={idx}>
                <TableCell className='min-w-40'>{donor.user.name}</TableCell>
                <TableCell className='min-w-40'>{receiver.name}</TableCell>
                <TableCell>
                  {dayjs(scheduledAt).format('D MMM, YYYY')}
                </TableCell>
                <TableCell>
                  <Link
                    className='font-medium text-secondary flex w-16 items-center gap-1'
                    href={`/admin/appointments/details?id=${id}`}
                  >
                    details
                    <ArrowRight className='size-3' strokeWidth={3} />
                  </Link>
                </TableCell>
                <TableCell className='w-20'>
                  <CMenu trigger={<MoreVertical />} actions={[]} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}
