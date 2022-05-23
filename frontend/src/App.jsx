import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout/Checkout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Order from './pages/Order/Order';
import OrderSummary from './pages/OrderSummary/OrderSummary';
import Payment from './pages/Payment/Payment';
import Register from './pages/Register/Register';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/order/:orderId" element={<Order />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
