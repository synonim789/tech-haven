import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const ContactPage = () => {
  return (
    <section>
      <h3 className="py-20 text-center text-6xl font-bold text-slate-500">
        Contact
      </h3>
      <div className="flex w-full flex-col justify-center lg:flex-row lg:items-stretch lg:justify-stretch">
        <iframe
          id="gmap_canvas"
          src="https://maps.google.com/maps?hl=en&amp;q=4563%20Larwin%20Ave%20Cypress+(TechHaven)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          className="min-h-[400px] lg:w-1/3 xl:w-1/2"
        ></iframe>

        <ContactInfo className="lg:w-1/3 xl:w-1/2" />
        <ContactForm className="lg:w-1/3 xl:w-1/2" />
      </div>
    </section>
  )
}
export default ContactPage
