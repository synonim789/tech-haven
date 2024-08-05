type Props = {
  name: string
  error?: string | undefined
  register: any
}

const FormTextarea = ({ name, error, register }: Props) => {
  return (
    <div className="my-4 flex w-full cursor-pointer flex-col text-[20px] font-semibold capitalize">
      <label htmlFor={name} className="text-gray-500">
        {name}
      </label>
      <textarea
        name={name}
        id={name}
        className="h-[200px] resize-none rounded-xl border-2 border-solid border-gray-300 px-3 py-2 shadow-lg outline-none placeholder:capitalize placeholder:text-slate-500 dark:border-gray-700 dark:bg-transparent dark:text-gray-400"
        placeholder={`Enter ${name}`}
        {...register}
      ></textarea>
      <p className="flex flex-col text-[20px] font-bold text-red-500">
        {error}
      </p>
    </div>
  )
}
export default FormTextarea
