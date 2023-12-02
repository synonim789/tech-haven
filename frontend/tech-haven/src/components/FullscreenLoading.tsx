import { createPortal } from 'react-dom'

const FullscreenLoading = () => {
  return createPortal(
    <>
      <div className="bg-[#120b90] fixed inset-0 z-40"></div>
      <div className="w-[150px] h-[150px] border-[10px] border-solid border-white border-b-[transparent] rounded-full z-50 fixed top-1/2 left-1/2 mt-[-75px] ml-[-75px] animate-spin"></div>
    </>,
    document.getElementById('portal')!
  )
}
export default FullscreenLoading
