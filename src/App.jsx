import './App.css';
import Navbar from './components/navbar.jsx';
import UserInfo from './components/userInfo.jsx';
import Feed from './components/feed.jsx';
import Footer from './components/footer.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [feedElements, setFeedElements] = useState([]);
  const [tag, setTag] = useState('all');
  const [currentLocation, setCurrentLocation] = useState('Please Log In');
  const [displayName, setDisplayName] = useState('Please Log In');
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png')
  const [id, setID] = useState('')


  useEffect(() => {
    const getLocations = async () => {
      try {
        const settings = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tag,
          }),
        };
        const response = await fetch('/placeholder', settings);
        //use setFeedElements here
      } catch (error) {
        console.log('problem with getLocations get request');
        console.log(error);
      }
    };
    getLocations();
  }, [tag]);
  
  useEffect(() => {
    //logic for constructing each location card
  }, [feedElements]);
  return (
    <div className="flex flex-col justify-center items-center content-center">
      <Navbar setProfilePic={setProfilePic} setID={setID} setCurrentLocation={setCurrentLocation} setDisplayName={setDisplayName} setUserName={setUserName} userName={userName}/>
      <div className=" w-3/4 flex flex-col content-center justify-center flex-wrap">
        <UserInfo currentLocation={currentLocation} displayName={displayName} userName={userName} profilePic={profilePic}/>
        <Feed setTag={setTag}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
