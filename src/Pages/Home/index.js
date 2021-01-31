/* -------------------------------------------------------------------------- */
/*                                  HOME PAGE                                 */
/* -------------------------------------------------------------------------- */
// Packages
import React, { useState, useEffect } from 'react';

// Components
import Loader from '../../Components/Loader';

// Services
import * as CrawlerService from '../../lib/crawler.service';

// Helpers
import { getUrlParamByName } from '../../lib/helpers';

// Styles
import './index.css';

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */
function Home() {
  /* ---------------------------------- HOOKS --------------------------------- */

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const query = getUrlParamByName('q');

  useEffect(async () => {
    try {
      if (query) {
        setLoading(true);
        setData([]);
        const links = await CrawlerService.extractLibraries(query, 5);
        setData(links);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  /* -------------------------------- FUNCTIONS ------------------------------- */

  async function onSearch(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setData([]);
      const links = await CrawlerService.extractLibraries(searchTerm, 5);
      setData(links);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const onChangeValue = (e) => {
    setSearchTerm(e.target.value);
  };
  /* -------------------------------- RENDRING -------------------------------- */
  return (
    <div className="container">
      <div>
        <h1>Web crawler</h1>
      </div>
      {!query && (
        <>
          <form onSubmit={onSearch}>
            <div className="search-input">
              <div>
                <input disabled={!!query} type="text" placeholder="Search . . ." onChange={onChangeValue} />
              </div>
            </div>
          </form>
          <div>
            <p>Click on search icon, then type your keyword. and Press Enter</p>
          </div>
        </>
      )}
      <div className="card-list">
        {loading && <Loader />}
        {!loading &&
          data &&
          data.map((item, index) => (
            <div className="card-item" key={item.name}>
              <div className="card-item-order">
                <span>{index + 1}</span>
              </div>
              <div className="card-item-content">
                <span>{item.name}</span>
              </div>
              <div className="card-item-count">
                <span>{item.count}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
