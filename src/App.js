import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Memory from './components/Memory';

function App() {
  return (
    <div className="App">
      <h1>가계부 프로젝트</h1>
      <h3>조수희 배워라 </h3>
      <Form updateHousehold={() => { }} />
      <Memory />

    </div>
  );
}

export default App;
