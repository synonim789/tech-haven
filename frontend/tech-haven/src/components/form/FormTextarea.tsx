type FormTextareaProps = {
  name: string
  error?: string | undefined
  register: any
}

const FormTextarea = ({ name, error, register }: FormTextareaProps) => {
  return (
    <div className="flex flex-col w-full text-[20px] font-semibold cursor-pointer capitalize my-4">
      <label htmlFor={name}>{name}</label>
      <textarea
        name={name}
        id={name}
        className="px-3 py-2 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl placeholder:capitalize resize-none h-[200px]"
        placeholder={`Enter ${name}`}
        {...register}
      ></textarea>
      <p className="font-bold text-red-600 flex flex-col">{error}</p>
    </div>
  )
}
export default FormTextarea
