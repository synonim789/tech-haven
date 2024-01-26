type FormButtonProps = {
  loading: boolean
  loadingText?: string
  text: string
}

const FormButton = ({ loading, loadingText, text }: FormButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-[#405684] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
    >
      {loading ? loadingText : text}
    </button>
  )
}
export default FormButton
