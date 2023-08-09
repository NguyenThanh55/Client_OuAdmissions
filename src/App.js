// import './App.css';
import { useEffect, useState } from 'react';
import typeApi from './api/typeApi';
import TodoFeature from './features/Todo';
import axios from 'axios';

function App() {
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      try {
        const request = await axios.get(
          // 'http://localhost:8088/OUAdmission/api/type'
              // 'https://jsonplaceholder.typicode.com/posts?_limit=10'
              'http://192.168.56.1:8088/OUAdmission/api/type'
        )
        console.log(request.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTypes()
  }, []);


  return (
    <div className='App'>
      {/* <TypeList typeList={} /> */}
      <TodoFeature />
      {/* <AlbumFeature /> */}
    </div>
  );
}

export default App;
