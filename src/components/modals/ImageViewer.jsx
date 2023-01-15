import { Link } from 'react-router-dom';
import './ImageViewer.css';

const { PUBLIC_URL } = process.env;

const ImageViewer = props => {
  const {
    setShowImageViewer,
    imageSrc,
    setImageSrc
  } = props;

  return (
    <div className="image-viewer">
      <div
        onClick={() => {
          setShowImageViewer(false);
          setImageSrc("");
        }}
        className="close-image-viewer"
      >
        <img src={`${PUBLIC_URL}/svg/icons/close_black.svg`} alt="close" />
      </div>
      <img src={imageSrc} alt="modal-pic-viewer" />
      
      <Link to={imageSrc} target="_blank" download>
        <button className="download-image">Download image</button>
      </Link>
    </div>
  )
}

export default ImageViewer;