import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function Settings(){
  return (
    <div className='h-full flex flex-col p-12'>
        <h1 className='text-2xl font-bold'>Settings</h1>

        <Separator orientation='horizontal' />

        <div className='flex gap-4'>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-4'>
              <h3>Gabriel Frutuoso</h3>
              <p>gabrielfrutuoso@gmail.com</p>
            </div>
        </div>

    </div>
  )
}
