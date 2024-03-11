type FormInputProps = {
  name: string
  type: string
  error?: string | undefined
  register: any
}

const FormInput = ({ name, type, error, register }: FormInputProps) => {
  return (
    <div className="flex flex-col w-full text-[20px] font-semibold cursor-pointer capitalize">
      <label htmlFor={name} id={name} className="dark:text-gray-500">
        {name}
      </label>
      <input
        type={type}
        className="px-3 py-2 border-[2px] border-solid border-gray-300 dark:border-gray-700  placeholder:text-slate-500 dark:text-gray-400 outline-none shadow-lg rounded-xl dark:bg-transparent placeholder:capitalize "
        placeholder={`Enter ${name}`}
        {...register}
        step={0.01}
      />
      <p className="font-bold text-red-500 flex flex-col">{error}</p>
    </div>
  )
}
export default FormInput
