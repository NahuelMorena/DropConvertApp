import './App.css';
import Dropzone from './Dropzone';
import Footer from './Footer';
const App = (): JSX.Element => {
  return (
    <div className="App">
      <h1>DropConvertApp</h1>
      <Dropzone />
      <Footer />
    </div>
  );
};

export default App
