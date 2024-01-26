import image from '../../assets/gadgets.jpg'
import AboutImage from './AboutImage'

const AboutPage = () => {
  return (
    <main className="max-w-5xl mx-auto flex flex-col md:flex-row my-10 justify-between gap-20 items-center">
      <div className="flex flex-col items-center gap-5 w-3/5 ">
        <h2 className="text-5xl w-fit text-[#405684] font-bold text-center relative after:content-[''] after:absolute after:h-1 after:w-4/5 after:bg-orange-500 after:left-0 after:-bottom-1 after:right-0 after:mx-auto">
          About us
        </h2>
        <p className="text-2xl text-center dark:text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ab
          aliquam quod? Architecto adipisci neque eaque necessitatibus ducimus
          quod molestiae, minima quis repudiandae sint ex eligendi illo ratione
          libero consectetur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sequi, magnam tenetur! Veritatis corrupti voluptatum saepe
          aspernatur.
        </p>
      </div>
      <div className="px-5 md:px-0">
        <AboutImage src={image} />
      </div>
    </main>
  )
}
export default AboutPage
