import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import './ContactForm.css'

const ContactForm = () => {
  const form = useForm()
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = (data) => {
    console.log('Form submitted', data)
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
            name="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: 'Invalid email',
              },
            })}
          />
          <p className="contact-form__error">{errors.email?.message}</p>
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
          <p className="contact-form__error">{errors.name?.message}</p>
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
          <p className="contact-form__error">{errors.message?.message}</p>
        </label>
        <button type="submit" className="contact-form__cta">
          Send Message
        </button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
export default ContactForm
