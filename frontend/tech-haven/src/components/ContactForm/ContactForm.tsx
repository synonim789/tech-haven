import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import './ContactForm.css'

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
    <div className="contact-form">
      <form
        action="#"
        className="contact-form__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className="contact-form__label">
          <span>Your Email</span>
          <input
            type="email"
            className="contact-form__input"
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
            <p className="contact-form__error">{errors.email.message}</p>
          )}
        </label>

        <label className="contact-form__label">
          <span>Your Name</span>
          <input
            type="text"
            className="contact-form__input"
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
            <p className="contact-form__error">{errors.name.message}</p>
          )}
        </label>
        <label className="contact-form__label">
          <span>Your Message</span>
          <textarea
            rows={7}
            className="contact-form__input"
            placeholder="Enter your message"
            {...register('message', {
              required: 'Message is Required',
            })}
          />
          {errors?.message && (
            <p className="contact-form__error">{errors.message.message}</p>
          )}
        </label>
        <button type="submit" className="contact-form__cta">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
export default ContactForm
