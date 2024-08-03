import image from '../../assets/gadgets.jpg'
import AboutImage from './AboutImage'

const AboutPage = () => {
  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-5xl fit text-[#405684] font-bold text-center relative after:content-[''] after:absolute after:h-1 after:w-[175px] after:bg-orange-500 after:left-0 after:-bottom-1 after:right-0 after:mx-auto mb-8 w-full">
        About us
      </h2>
      <div className="w-full flex justify-between gap-5 items-center flex-col-reverse md:flex-row">
        <p className="text-2xl text-center dark:text-slate-400 max-w-lg">
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
