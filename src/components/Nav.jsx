import './scss/Nav.css';

const Nav = () => {

  const logo = "./svg/icons/jm_black.svg";
  const burger = "./svg/icons/burger.svg";

  return (
    <nav>

      <div className="burger-menu">
        <img src={burger} alt="burger-menu" />
      </div>

      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Desktop only */}
      <div className="buttons">

      </div>

    </nav>
  )
}

export default Nav;