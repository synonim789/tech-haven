import ContactForm from '../components/ContactForm/ContactForm'
import ContactInfo from '../components/ContactInfo/ContactInfo'

const ContactPage = () => {
  return (
    <section className="max-w-5xl mx-auto my-10 flex flex-col  items-center">
      <h1 className="font-bold text-5xl text-center text-[#120b90] relative after:content-[''] after:absolute after:bg-orange-500 after:w-4/5 after:h-1 after:-bottom-1 after:left-0 after:right-0 after:mx-auto">
        Contact
      </h1>
      <div className="flex gap-5">
        <ContactForm />
        <ContactInfo />
      </div>
      <div className="w-fit m-auto p-4 bg-white rounded-xl shadow-md">
        <iframe
          width="925"
          height="420"
          frameBorder="0"
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=925&amp;height=420&amp;hl=en&amp;q=4563%20Larwin%20Ave%20Cypress+(TechHaven)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
    </section>
  )
}
export default ContactPage
