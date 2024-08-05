type Props = {
  name: string
  type: string
  error?: string | undefined
  register: any
  [key: string]: any
}

const FormInput = ({ name, type, error, register, ...props }: Props) => {
  return (
    <div className="mb-4 flex w-full cursor-pointer flex-col text-[20px] font-semibold capitalize">
      <label htmlFor={name} className="dark:text-gray-500">
        {name}
      </label>
      <input
        type={type}
        className="rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-80 dark:border-gray-700 dark:bg-transparent dark:text-gray-400"
        placeholder={`Enter ${name}`}
        {...register}
        step={0.01}
        id={name}
        name={name}
        autoComplete={name}
        {...props}
      />
      <p className="flex flex-col font-bold text-red-500">{error}</p>
    </div>
  )
}
export default FormInput
