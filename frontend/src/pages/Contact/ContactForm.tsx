import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormTextarea from '../../components/form/FormTextarea'

type ContactFormSubmitData = {
  email: string
  name: string
  message: string
}

type Props = {
  className: string
}

const ContactForm = ({ className }: Props) => {
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
    <div className={`${className} p-10`}>
      <form
        action="#"
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormInput
          name="email"
          type="email"
          error={errors?.email?.message}
          register={{
            ...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: 'Invalid email',
              },
            }),
          }}
        />

        <FormInput
          name="name"
          type="text"
          register={{
            ...register('name', {
              required: 'Name is Required',
              pattern: {
                value:
                  /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
                message: 'Invalid name',
              },
            }),
          }}
          error={errors?.name?.message}
        />
        <FormTextarea
          name="Message"
          register={{
            ...register('message', {
              required: 'Message is Required',
            }),
          }}
          error={errors.message?.message}
        />
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
