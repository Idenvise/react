import './App.css';
import { api } from './Api';
import { useEffect, useState } from 'react';

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');
  
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchType, setSearchType] = useState('code');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [list, setList]= useState([]);
 
  const handleTextAreaChange = (e) => {
   setTextAreaValue(e.target.value)
  };
  const handleSearchInputChange = (e) => {
   setSearchInputValue(e.target.value)
  };
  const handleSearchTypeChange = (e) => {
   setSearchType(e.target.value)
  };
  const handlePageAmountChange = (e) => {
    setPageSize(e.target.value)
  };
  const handleSortColumnChange = (e) => {
   setSortColumn((prevState) => {
     if (prevState === e.target.value || sortOrder === '') handleSortOrderChange();
     return e.target.value
   })
  };
  const handleSortOrderChange = () => {
   sortOrder === '' ? setSortOrder('asc') : sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc');
  };

  function handleCreateClick() {
    api.createObj(textAreaValue);
  }

  useEffect(() => {
    api.getData({
      codeFilter: searchType === 'code' ? searchInputValue : '',
      valueFilter: searchType === 'value' ? searchInputValue : '',
      sortColumn: sortColumn,
      sortOrder: sortOrder,
      page: page,
      pageSize: pageSize
    })
    .then(res => setList(res));
  }, [page, pageSize, searchInputValue, searchType, sortColumn, sortOrder]);

  return (
    <div className='app'>
      <div className='app-wrapper'>
        <h2 className='app__title'>Input Json:</h2>
        <textarea className='app__input' onChange={handleTextAreaChange}></textarea>
        <button className='app__input-create' type='button' onClick={handleCreateClick}>Create</button>
        <form className='app__search-form'>
          <input className='app__search-form__input' type='text' onChange={handleSearchInputChange}/>
          <button className='app__search-form__submit' type='submit'>Search</button>
          <select className='app__search-form__select' onChange={handleSearchTypeChange}>
            <option value='codeFilter'>Code</option>
            <option value='valueFilter'>Value</option>
          </select>
        </form>
        <div className='app__table'>
          <button className='app__table-sort cell'>id</button>
          <button className='app__table-sort cell' value='code' onClick={handleSortColumnChange}>code</button>
          <button className='app__table-sort cell' value='value' onClick={handleSortColumnChange}>value</button>
          {
            list.items && list.items.map(item => 
              <>
                <h2 className='app__title cell'>{item.id}</h2>
                <h2 className='app__title cell'>{item.code}</h2>
                <h2 className='app__title cell'>{item.value}</h2> 
              </> 
            )
          }
        </div>
        <div className='app__pagination'>
          <button className='app__refresh' type='button'>Refresh</button>
          <div className='app__pages'>
            <button className='app__pages_button'>1</button>
            <button className='app__pages_button'>2</button>
            <p className='app__pages_text'>...</p>
            <button className='app__pages_button'>99</button>
          </div>
          <select className='app__pages-amount' onChange={handlePageAmountChange}>
            <option>2</option>
            <option>5</option>
            <option>10</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
