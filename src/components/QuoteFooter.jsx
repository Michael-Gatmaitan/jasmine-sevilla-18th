import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { quotes } from '../Quotes';
import './scss/QuoteFooter.css';

const QuoteFooter = () => {

  const location = useLocation();

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => shuffleQuote(), [location.pathname]);

  const shuffleQuote = () => {
    let randomNumber = Math.floor(Math.random() * (quotes.length - 0 + 1) + 0);
    setQuote(quotes[randomNumber]);
    document.body.scrollIntoView(true);
  }

  return (
    <div className="quote-footer">
      <div className="myname-label">Michael Gatmaitan, Sept. 2022</div>

      <div className="quote-container">
        <div className="quote">
          {quote}
        </div>
      </div>
    </div>
  )
}

export default QuoteFooter;