import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { HiOutlineMapPin } from 'react-icons/hi2'

type ContactInfoProps = {
  className: string
}

const ContactInfo = ({ className }: ContactInfoProps) => {
  return (
    <section
      className={`flex flex-col items-center justify-center gap-5 text-center ${className} bg-white min-h-[400px]`}
    >
      <p className="text-[20px] font-bold flex items-center gap-2 md:text-[25px]">
        <AiOutlineMail />
        <span className="text-[#120b90]">techhaven@techaven.com</span>
      </p>
      <p className="text-[20px] font-bold flex items-center gap-2 md:text-[25px]">
        <AiOutlinePhone />
        <span className="text-[#120b90]">209-832-3434</span>
      </p>
      <p className="text-[20px] font-bold flex items-center gap-2 md:text-[25px]">
        <HiOutlineMapPin />
        <span className="text-[#120b90]">4563 Larwin Ave California</span>
      </p>
    </section>
  )
}
export default ContactInfo
