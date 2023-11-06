import ContactForm from '../../components/ContactForm/ContactForm'
import './ContactPage.css'

const ContactPage = () => {
  return (
    <section className="contact-page">
      <h1 className="contact-title">Contact</h1>
      <div className="contact-info">
        <ContactForm />
      </div>
      <div className="contact-map"></div>
    </section>
  )
}
export default ContactPage
