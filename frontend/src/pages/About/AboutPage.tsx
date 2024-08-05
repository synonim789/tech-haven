import image from '../../assets/gadgets.jpg'
import AboutImage from './AboutImage'

const AboutPage = () => {
  return (
    <section className="mx-auto my-10 max-w-6xl px-4">
      <h2 className="fit relative mb-8 w-full text-center text-5xl font-bold text-[#405684] after:absolute after:inset-x-0 after:-bottom-1 after:mx-auto after:h-1 after:w-[175px] after:bg-orange-500 after:content-['']">
        About us
      </h2>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row">
        <p className="max-w-lg text-center text-2xl dark:text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ab
          aliquam quod? Architecto adipisci neque eaque necessitatibus ducimus
          quod molestiae, minima quis repudiandae sint ex eligendi illo ratione
          libero consectetur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sequi, magnam tenetur! Veritatis corrupti voluptatum saepe
          aspernatur.
        </p>
        <AboutImage src={image} />
      </div>
    </section>
  )
}
export default AboutPage
