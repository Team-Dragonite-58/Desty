import "./App.css";
import Navbar from "./components/navbar.jsx";
import UserInfo from "./components/userInfo.jsx";
import Feed from "./components/feed.jsx";
import Footer from "./components/footer.jsx";
import { useEffect, useState } from "react";
import LocationCard from "./components/locationcard";

function App() {
  const [feedElements, setFeedElements] = useState([]);
  const [tag, setTag] = useState("All");
  const [currentLocation, setCurrentLocation] = useState("Please Log In");
  const [displayName, setDisplayName] = useState("Please Log In");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
  );
  const [id, setID] = useState("");

  useEffect(() => {
    const getLocations = async () => {
      try {
        const settings = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag,
            id,
          }),
        };
        const data = await fetch("http://localhost:3001/location/get",settings);
        const response = await data.json();
        const locations = response.map((location) => {
          return new LocationCard(location, setFeedElements, feedElements, tag)
        });
        setFeedElements(locations)
      } catch (error) {
        console.log("problem with getLocations get request");
        console.log(error);
      }
    };
    getLocations();
  }, [tag, displayName]);

  return (
    <div className="flex flex-col justify-center items-center content-center">
      <Navbar
        setProfilePic={setProfilePic}
        setID={setID}
        setCurrentLocation={setCurrentLocation}
        setDisplayName={setDisplayName}
        setUserName={setUserName}
        userName={userName}
      />
      <div className="w-3/4 flex flex-col content-center justify-center flex-wrap">
        <UserInfo
          userId={id}
          setDisplayName={setDisplayName}
          setCurrentLocation={setCurrentLocation}
          currentLocation={currentLocation}
          displayName={displayName}
          userName={userName}
          profilePic={profilePic}
        />
        <Feed
          setTag={setTag}
          userId={id}
          feedElements={feedElements}
          setFeedElements={setFeedElements}
          tag={tag}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
