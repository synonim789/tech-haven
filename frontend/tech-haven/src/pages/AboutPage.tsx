import image from '../assets/gadgets.jpg'
import AboutImage from '../components/AboutImage'
// import './AboutPage.css'
const AboutPage = () => {
  return (
    <main className="max-w-5xl mx-auto flex flex-col md:flex-row my-10 justify-between gap-20 items-center">
      <div className="flex flex-col items-center gap-5 w-3/5 ">
        <h1 className="text-5xl w-fit text-[#120b90] font-bold text-center relative after:content-[''] after:absolute after:h-1 after:w-4/5 after:bg-orange-500 after:left-0 after:-bottom-1 after:right-0 after:mx-auto">
          About us
        </h1>
        <p className="text-2xl text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ab
          aliquam quod? Architecto adipisci neque eaque necessitatibus ducimus
          quod molestiae, minima quis repudiandae sint ex eligendi illo ratione
          libero consectetur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sequi, magnam tenetur! Veritatis corrupti voluptatum saepe
          aspernatur.
        </p>
      </div>
      <div>
        <AboutImage src={image} />
      </div>
    </main>
  )
}
export default AboutPage
