import ContactForm from '../../components/ContactForm/ContactForm'
import ContactInfo from '../../components/ContactInfo/ContactInfo'
import './ContactPage.css'

const ContactPage = () => {
  return (
    <section className="contact-page">
      <h1 className="contact-page__title">Contact</h1>
      <div className="contact-page__info">
        <ContactForm />
        <ContactInfo />
      </div>
      <div className="contact-page__map">
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
