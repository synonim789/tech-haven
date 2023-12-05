type FormInputProps = {
  name: string
  type: string
  error: string | undefined
  register: any
}

const FormInput = ({ name, type, error, register }: FormInputProps) => {
  return (
    <div className="flex flex-col w-full text-[20px] font-semibold cursor-pointer capitalize">
      <label htmlFor={name} id={name}>
        {name}
      </label>
      <input
        type={type}
        className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl placeholder:capitalize"
        placeholder={`Enter ${name}`}
        {...register}
      />
      <p className="font-bold text-red-600 flex flex-col">{error}</p>
    </div>
  )
}
export default FormInput
