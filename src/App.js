import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoInput from './components/TodoInput'
import Home from './components/Home'

function App() {

  return(
    <div>
      <div style={{position : 'fixed' , top : '0px' , left : '0px'}}>
      <Navbar />
      </div>
      <Routes>
        <Route exact path='/home' Component={Home}/>
        <Route exact path='/form' Component={TodoInput}/>
      </Routes>
    </div>
  )
}
export default App;
