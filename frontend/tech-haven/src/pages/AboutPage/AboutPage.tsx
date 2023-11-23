import image from '../../assets/gadgets.jpg'
import AboutImage from '../../components/AboutImage/AboutImage'
import './AboutPage.css'
const AboutPage = () => {
  return (
    <main className="about-us">
      <div className="about-us__left">
        <h1 className="about-us__title">About us</h1>
        <p className="about-us__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ab
          aliquam quod? Architecto adipisci neque eaque necessitatibus ducimus
          quod molestiae, minima quis repudiandae sint ex eligendi illo ratione
          libero consectetur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sequi, magnam tenetur! Veritatis corrupti voluptatum saepe
          aspernatur. Perspiciatis mollitia ea iure, ut molestiae adipisci.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ab
          aliquam quod? Architecto adipisci neque eaque necessitatibus ducimus
          quod molestiae, minima quis repudiandae sint ex eligendi illo ratione
          libero consectetur! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sequi, magnam tenetur! Veritatis corrupti voluptatum saepe
          aspernatur. Perspiciatis mollitia ea iure, ut molestiae adipisci.
        </p>
      </div>
      <div className="about-us__right">
        <AboutImage src={image} />
      </div>
    </main>
  )
}
export default AboutPage
