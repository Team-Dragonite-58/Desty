import './App.css';
import Navbar from './components/navbar.jsx';
import UserInfo from './components/userInfo.jsx';
import Feed from './components/feed.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <div className="flex flex-col justify-center items-center content-center">
      <Navbar />
      <div className="flex flex-col content-center justify-center flex-wrap">
        <UserInfo />
        <Feed />
        <Footer />
      </div>
    </div>
  );
}

export default App;
