import emailjs from '@emailjs/browser'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import Textarea from '../../components/form/Textarea'
import { cn } from '../../utils/cn'
import { contactSchema, ContactValues } from '../../validation/contact'

type Props = {
  className: string
}

const ContactForm = ({ className }: Props) => {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      message: '',
      name: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form
  const [loading, setLoading] = useState(false)

  const onSubmit = (data: ContactValues) => {
    setLoading(true)
    emailjs
      .send('service_7bby6nl', 'template_bf3x50i', data, 'O1sfst0O8Xe5oLKVS')
      .then(
        () => {
          toast.success('Message send successfully')
          setLoading(false)
        },
        () => {
          toast.error('Something went wrong')
        },
      )
    reset()
  }

  return (
    <div className={cn('p-10', className)}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            error={errors?.email?.message}
            {...register('email')}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Name"
            error={errors?.name?.message}
            {...register('name')}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter Message"
            error={errors.message?.message}
            {...register('message')}
          />
          <ErrorMessage
            errors={errors}
            name="message"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>

        <FormButton
          text="Send Message"
          loading={loading}
          loadingText="Sending..."
        />
      </form>
    </div>
  )
}
export default ContactForm
