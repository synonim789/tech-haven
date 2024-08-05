import { createPortal } from 'react-dom'

const FullscreenLoading = () => {
  return createPortal(
    <>
      <div className="fixed inset-0 z-[2000] bg-[#405684]"></div>
      <div className="fixed left-1/2 top-1/2 z-[2001] ml-[-75px] mt-[-75px] size-[150px] animate-spin rounded-full border-[10px] border-solid border-white border-b-transparent"></div>
    </>,
    document.getElementById('portal')!
  )
}
export default FullscreenLoading
