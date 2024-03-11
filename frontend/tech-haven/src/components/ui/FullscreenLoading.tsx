import { createPortal } from 'react-dom'

const FullscreenLoading = () => {
  return createPortal(
    <>
      <div className="bg-[#405684] fixed inset-0 z-[2000]"></div>
      <div className="w-[150px] h-[150px] border-[10px] border-solid border-white border-b-[transparent] rounded-full z-[2001] fixed top-1/2 left-1/2 mt-[-75px] ml-[-75px] animate-spin"></div>
    </>,
    document.getElementById('portal')!
  )
}
export default FullscreenLoading
