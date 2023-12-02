import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'

const ContactInfo = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <p className="text-[25px] font-bold flex items-center gap-2">
        <AiOutlinePhone />
        Email: <span className="text-[#120b90]">techhaven@techaven.com</span>
      </p>
      <p className="text-[25px] font-bold flex items-center gap-2">
        <AiOutlineMail />
        Phone: <span className="text-[#120b90]">209-832-3434</span>
      </p>
      <p className="text-[25px] font-bold flex items-center gap-2">
        <HiOutlineMapPin />
        Address:{' '}
        <span className="text-[#120b90]">
          4563 Larwin Ave, Cypress, California, US
        </span>
      </p>
    </section>
  )
}
export default ContactInfo
