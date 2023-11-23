import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'
import './ContactInfo.css'
const ContactInfo = () => {
  return (
    <section className="contact-info">
      <p className="contact-info__phone">
        <AiOutlinePhone />
        Email: <span>techhaven@techaven.com</span>
      </p>
      <p className="contact-info__email">
        <AiOutlineMail />
        Phone: <span>209-832-3434</span>
      </p>
      <p className="contact-info__address">
        <HiOutlineMapPin />
        Address: <span>4563 Larwin Ave, Cypress, California, US</span>
      </p>
    </section>
  )
}
export default ContactInfo
