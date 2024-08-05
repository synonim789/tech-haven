type Props = {
  loading: boolean
  loadingText?: string
  text: string
  disabled?: boolean
  className?: string
}

const FormButton = ({
  loading,
  loadingText,
  text,
  disabled,
  className,
}: Props) => {
  return (
    <button
      type="submit"
      className={`rounded-lg bg-[#405684] px-4 py-2 text-[24px] font-bold text-white transition hover:scale-105 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${
        className ? className : 'w-full'
      } mx-auto`}
      disabled={loading || disabled}
    >
      {loading ? loadingText : text}
    </button>
  )
}
export default FormButton
