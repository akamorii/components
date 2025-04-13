import React, {useRef, useState} from 'react';
import './styles/app.css'
import post from './components/post';
import AsidePanel from './components/asidePanel';
import DataViewWindow from './components/dataViewWindow';
import Mybutton from './components/UI/button/mybutton';


function App() {

// const [posts, setPosts] = useState([
//       {'id': 1 ,postName: 'Hitler is not blamed', postData:"post..."},
//       {'id': 2 ,postName: 'artem reactoru pizda', postData:"post..."},
//       {'id': 3 ,postName: 'zxc', postData:"post..."}
//   ]);

  const testRef = useRef()
  
  return (
    <div className="App">

      {/* <form>
        <input ref={testRef} type='text'/>
        <Mybutton onClick={(e) => {e.preventDefault();
        console.log(testRef.current.value);
        }}/>
      </form> */}

      <AsidePanel/>
        <DataViewWindow/>

      {/* <post post={{postName: 'Hitler is not blamed', postData:"post..."}}/> */}

    </div>
  );
}

export default App;
