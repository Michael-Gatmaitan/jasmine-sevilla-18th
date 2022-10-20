import './scss/Nav.css';

const Nav = ({setShowSideBar})=> {
  const { PUBLIC_URL } = process.env;
  
  const logo = `${PUBLIC_URL}/svg/icons/jm_black.svg`;
  const burger = `${PUBLIC_URL}/svg/icons/burger.svg`;

  return (
    <nav className="main-nav">

      <div className="burger-menu" onClick={ () => setShowSideBar(true) }>
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