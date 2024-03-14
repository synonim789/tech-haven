type Props = {
  loading: boolean
  loadingText?: string
  text: string
  disabled?: boolean
}

const FormButton = ({ loading, loadingText, text, disabled }: Props) => {
  return (
    <button
      type="submit"
      className="bg-[#405684] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading || disabled}
    >
      {loading ? loadingText : text}
    </button>
  )
}
export default FormButton
