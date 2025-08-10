import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import bitcoin from '../../assets/bitcoin2.jpeg'
import etherum from '../../assets/etherum2.png';
import dogecoin from '../../assets/dogecoin2.png'
import litecoin from '../../assets/litecoin2.png';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  
  
 const [coins, setCoins] = useState([
  { image: bitcoin, color: '#3c3c3d', top: Math.random() * 80, left: Math.random() * 100 },
  { image: etherum, color: '#3c3c3d', top: Math.random() * 80, left: Math.random() * 100 },
  { image:  dogecoin, color: '#3c3c3d', top: Math.random() * 80, left: Math.random() * 100 },
  { image: litecoin, color: '#3c3c3d', top: Math.random() * 80, left: Math.random() * 100 },
]);

  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCoins((prevCoins) =>
        prevCoins.map((coin) => ({
          ...coin,
          top: Math.random() * 100,
          left: Math.random() * 100,
        }))
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const inputHandler = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const filtered = allCoin.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setDisplayCoin(filtered);
  };

  return (
    <div className='home'>
      <div className='hero'>
        {coins.map((coin, index) => (
          <div
            key={index}
            className='coin'
            style={{
              backgroundImage: `url(${coin.image})`,
              boxShadow: `0px 0px 10px ${coin.color}`,
              top: `${coin.top}%`,
              left: `${coin.left}%`,
              position: 'absolute',
            }}
          />
        ))}

        <h1 style={{position:'relative', zIndex:1}}>Powering <br /> the Next Generation of Crypto Investors</h1>
        <p style={{position:'relative', zIndex:1}}>
          Real-time data. Smart tools. Trusted marketplace. Dive into the digital economy today.
        </p>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list='coinlist'
            value={searchInput}
            type='text'
            placeholder='Search Crypto..'
            required
          />
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name} - {item.symbol.toUpperCase()}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>
            <p className='market-cap'>
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
