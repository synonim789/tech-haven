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
      <div className="contact-page__map"></div>
    </section>
  )
}
export default ContactPage
