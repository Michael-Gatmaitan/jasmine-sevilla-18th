import './ModalNav.css';

const ModalNav = (props) => {

  const {
    setShowMessage
  } = props;

  const logo = "./svg/icons/jm_white.svg";
  const back = "./svg/icons/back_white.svg";

  return (
    <nav className="modal-nav">

      <div className="back" onClick={ () => setShowMessage(false) }>
        <img src={back} alt="back" />
      </div>

      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Desktop only */}
      <div className="download-folder">
        {/* <img src="" */}
      </div>

    </nav>
  )
}

export default ModalNav;