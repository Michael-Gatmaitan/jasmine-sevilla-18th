import './PageBody.css';

const PageBody = props => {

  const {
    header,
    photoSrc,
  } = props;

  return (
    <div className="page-body h-1">

      <div className="page-header">
        {header}
      </div>

      <div className="page-image">
        <img src={photoSrc} alt="page-display" />
      </div>

    </div>
  )
}

export default PageBody;