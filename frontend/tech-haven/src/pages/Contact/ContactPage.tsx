import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const ContactPage = () => {
  return (
    <section>
      <div className="bg-contactHero min-h-[400px] bg-cover bg-center flex items-center justify-center"></div>
      <div className="flex lg:flex-row lg:items-stretch justify-center lg:justify-stretch flex-col w-full">
        <iframe
          id="gmap_canvas"
          src="https://maps.google.com/maps?hl=en&amp;q=4563%20Larwin%20Ave%20Cypress+(TechHaven)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          className="lg:w-1/3 xl:w-1/2 min-h-[400px]"
        ></iframe>

        <ContactInfo className="lg:w-1/3 xl:w-1/2" />
        <ContactForm className="lg:w-1/3 xl:w-1/2" />
      </div>
    </section>
  )
}
export default ContactPage
