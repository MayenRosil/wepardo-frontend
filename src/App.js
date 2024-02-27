import logo from './logo.svg';
import './App.css';

const myFunction = async ()=>{
  fetch('http://wepardo.services:3002/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
  .then(response => response.json())
  .then(data => console.log(data));
}

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={myFunction}>
        Click me!
      </button>
      </header>
    </div>
  );
}

export default App;
