import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'

const ContactInfo = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 w-full text-center">
      <p className="text-[20px] font-bold flex items-center gap-2 md:text-[25px] flex-col">
        <span className="flex flex-row items-center">
          <AiOutlinePhone /> Phone:
        </span>
        <span className="text-[#120b90]">techhaven@techaven.com</span>
      </p>
      <p className="text-[20px] font-bold flex items-center gap-2 md:text-[25px] flex-col ">
        <span className="flex flex-row items-center">
          <AiOutlineMail />
          Email:
        </span>
        <span className="text-[#120b90]">209-832-3434</span>
      </p>
      <p className="text-[20px] font-bold flex items-center gap-2 md:text-[25px] flex-col">
        <span className="flex flex-row items-center">
          <HiOutlineMapPin />
          Address:
        </span>

        <span className="text-[#120b90]">
          4563 Larwin Ave, Cypress, California, US
        </span>
      </p>
    </section>
  )
}
export default ContactInfo
