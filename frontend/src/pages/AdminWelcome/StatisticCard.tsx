type Props = {
  textColor: string
  upperValue: string | number
  bottomValue: string
}

const StatisticCard = ({ textColor, upperValue, bottomValue }: Props) => {
  return (
    <div
      className={`${textColor} w-full space-y-5 rounded-2xl bg-white px-10 py-5 text-center shadow-xl dark:bg-[#222427]`}
    >
      <div className="text-4xl font-bold">{upperValue}</div>
      <div className="text-xl">{bottomValue}</div>
    </div>
  )
}
export default StatisticCard
