import { Link } from "react-router-dom"
import Logo from "../../assets/logo/dragon-drop-logo.svg"
import "./Header.scss"

function Header() {
  return (
    <header className="header">
        <div className="header__alignment">
          <Link to="/"><img className="header__logo" src={Logo} alt="Dragon Drop Logo" /></Link>
          <Link to="/"><h1 className="header__title">Dragon Drop</h1></Link>
          <Link to="/"><button type="button" className="header__button">Log In</button></Link>
        </div>
    </header>
  )
}

export default Header