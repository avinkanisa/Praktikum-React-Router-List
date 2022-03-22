//import logo from './logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Kontak from './pages/kontak';
import Karya from './pages/karya';
import Gallery from './pages/gallery';
import Agenda from './pages/agenda';
import Cart from './pages/cart';
import './App.css';

function App() {
  return (
    <div className="flex justify-center p-6 w-screen h-screen bg-grey-200 overflow-y-auto">
      <div className="max-w-full">
        <div className="flex item-center justify-center mb-4 text-xs text-black-600 font-semibold uppercase tracking-wide">
          <Link
            className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/home">
            Home
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/about">
            About
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/kontak">
            Kontak
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/karya">
            Karya
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/gallery">
            Gallery
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/cart">
            Keranjang
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-x1 hover:bg-gray-100 transition-all ease-in-out"
            to="/agenda">
            Agenda
          </Link>
        </div>


        <div className="p-6 w-full bg-white rounded-x1 shadow-lg">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/kontak" element={<Kontak />}></Route>
            <Route path="/karya" element={<Karya />}></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/agenda" element={<Agenda />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
