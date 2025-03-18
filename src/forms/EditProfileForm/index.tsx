import React from 'react'
import { FormField } from '../FormField'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const EditProfileForm = () => {
  return (
    <form className="flex items-center gap-6">
    <div className="flex flex-col items-center gap-6 flex-1">
      <FormField>
        <Label htmlFor="username">username</Label>
        <Input name="title" type="text" id="title" />
      </FormField>
    </div>
  </form>
  )
}
