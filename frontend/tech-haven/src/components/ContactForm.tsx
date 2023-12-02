import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type ContactFormSubmitData = {
  email: string
  name: string
  message: string
}

const ContactForm = () => {
  const form = useForm<ContactFormSubmitData>()
  const { register, handleSubmit, formState, reset } = form
  const { errors } = formState
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<ContactFormSubmitData> = (data) => {
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
        }
      )
    reset()
  }

  return (
    <div className="mb-4">
      <form
        action="#"
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className="flex flex-col font-bold text-[20px]">
          <span>Your Email</span>
          <input
            type="email"
            className="px-4 py-3 rounded-xl border border-solid border-slate-300 shadow-md"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: 'Invalid email',
              },
            })}
          />
          {errors?.email && (
            <p className="text-red-600 font-bold">{errors.email.message}</p>
          )}
        </label>

        <label className="flex flex-col font-bold text-[20px]">
          <span>Your Name</span>
          <input
            type="text"
            className="px-4 py-3 rounded-xl border border-solid border-slate-300 shadow-md  "
            placeholder="Enter your name"
            {...register('name', {
              required: 'Name is Required',
              pattern: {
                value:
                  /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
                message: 'Invalid name',
              },
            })}
          />
          {errors?.name && (
            <p className="text-red-600 font-bold">{errors.name.message}</p>
          )}
        </label>
        <label className="flex flex-col font-bold text-[20px]">
          <span>Your Message</span>
          <textarea
            rows={7}
            className="px-4 py-3 rounded-xl border border-solid border-slate-300 shadow-md resize-none"
            placeholder="Enter your message"
            {...register('message', {
              required: 'Message is Required',
            })}
          />
          {errors?.message && (
            <p className="text-red-600 font-bold ">{errors.message.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="bg-[#120b90] text-white px-2 py-4 w-fit rounded-xl font-bold text-[20px] hover:opacity-60 hover:scale-105 transition-all "
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
export default ContactForm
