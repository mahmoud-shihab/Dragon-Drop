import { Link } from "react-router-dom"
import Logo from "../../assets/logo/placeholder.png"
import "./Header.scss"

function Header() {
  return (
    <header className="header">
        <Link to="/"><img className="header__logo" src={Logo} alt="Dragon Drop Logo" /></Link>
        <Link to="/"><button type="button" className="header__button">Log In</button></Link>
    </header>
  )
}

export default Header