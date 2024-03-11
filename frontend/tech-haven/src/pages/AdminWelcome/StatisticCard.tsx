type Props = {
  textColor: string
  upperValue: string | number
  bottomValue: string
}

const StatisticCard = ({ textColor, upperValue, bottomValue }: Props) => {
  return (
    <div
      className={`${textColor} text-center bg-white dark:bg-[#222427] px-10 py-5 rounded-2xl space-y-5 shadow-xl min-w-[250px] w-full`}
    >
      <div className="font-bold text-4xl">{upperValue}</div>
      <div className="text-xl">{bottomValue}</div>
    </div>
  )
}
export default StatisticCard
