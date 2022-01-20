import "./styles.css";
import InfiniteScroll from "react-infinite-scroll-component";
import dotenv from "dotenv";
import { requestNewData } from "./utils/utils";
import { useState, useEffect } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  const [liked, setLiked] = useState([]);
  dotenv.config(); //configuring dotenv library to locate .env file
  const count = 20;

  //for majors stylings
  const Styles = {
    mainDiv: {
      width: "90%",
      borderRadius: "15px",
      backgroundColor: "white",
      margin: "5% 5% 5% 5%"
    },
    image: {
      objectFit: "contain",
      width: "100%",
      overflow: "hidden",
      borderRadius: "15px 15px 0px 0px"
    },
    scrollableDiv: {
      marginTop: "25%"
    },
    headBanner: {
      position: "fixed",
      top: "0%",
      zIndex: 100,
      backgroundColor: "red",
      width: "100%",
      height: 80,
      margin: "0",
      justifyContent: "center",
      alignItems: "center",
      padding: "none",
      color: "white",
      borderRadius: "0px 0px 10px 10px"
    }
  };

  //fetch more data when user gets to the bottom
  const fetchMoreData = () => {
    let data = requestNewData(count);
    data.then((res) => {
      setItems([...items, ...res.data]);
      let likeBool = [];
      for (var i = 0; i < count; i++) {
        likeBool.push(false);
      }
      setLiked([...liked, ...likeBool]);
    });
  };
  useEffect(() => {
    console.log(liked);
  }, [liked]);
  //on the first load, get pictures of the previous day
  useEffect(() => {
    let data = requestNewData(count);
    data
      .then((res) => {
        setItems(res.data);
        let likeBool = [];
        for (var i = 0; i < res.data.length; i++) {
          likeBool.push(false);
        }
        setLiked(likeBool);
      })
      .catch((e) => {
        console.log(e);
        console.log(e);
      });
  }, []);
  return (
    <div className="App">
      <div style={Styles.headBanner}>
        <h1>Spacestagram</h1>
      </div>
      <div className="scrollable-div" style={Styles.scrollableDiv}>
        <InfiniteScroll
          next={fetchMoreData}
          dataLength={items.length}
          style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {items.map((item, index) => {
            console.log(index);
            console.log(liked[index]);
            return (
              <div key={index} style={Styles.mainDiv}>
                <img style={Styles.image} src={item.hdurl} alt={item.image} />
                <h4>{item.title}</h4>
                <p style={{ textAlign: "left", padding: "5%" }}>
                  {item.explanation}
                </p>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: "5%"
                  }}
                >
                  <button
                    style={{
                      width: "25%",
                      left: 0,
                      color: "red",
                      borderColor: "red",
                      backgroundColor: "transparent",
                      borderRadius: "7px",
                      cursor: "pointer"
                    }}
                    onClick={(e) => {
                      //chnaging the style instantly
                      console.log("statis", liked[index]);
                      if (liked[index]) {
                        e.target.style.width = "25%";
                        e.target.style.left = 0;
                        e.target.style.color = "red";
                        e.target.style.backgroundColor = "white";
                        e.target.style.borderRadius = "7%";
                        e.target.style.curosr = "pointer";
                        e.target.innerHTML = "<span>&#10084; </span> Like";
                      } else {
                        e.target.style.backgroundColor = "red";
                        e.target.style.borderRadius = "7px";
                        e.target.style.borderColor = "red";
                        e.target.style.color = "white";
                        e.target.style.width = "25%";
                        e.target.style.left = 0;
                        e.target.style.cursor = "pointer";
                        e.target.innerHTML = "<span>&#10084; </span> Liked";
                      }

                      let likeBool = liked;
                      likeBool[index] = !likeBool[index];
                      setLiked(likeBool);
                    }}
                  >
                    <span>&#10084;</span> Like
                  </button>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
