import React, { useEffect } from "react";
import v1 from "./v1.mp4";
import v2 from "./v2.mp4";
import v3 from "./v3.mp4";
import v4 from "./v4.mp4";
import "./IntersectionObserver.css";

const IntersectionObserverDemo = () => {

    function cb(entries){
      entries.forEach( (entry) =>{
        // console.log(entry);
        let videoElement = entry.target ; 
        // console.log(videoElement) ; 

        videoElement.play().then(() => {
          if(entry.isIntersecting === false ){
            videoElement.pause() ; 
          }
        })

      })
    }
    let conditionObject = {
        root : null , 
        threshold : "0.5"
    }

    useEffect(()=> {
        let observerObject = new IntersectionObserver(cb, conditionObject) ; 
        let allVideoElements = document.querySelectorAll('.video-styles') ; 
        allVideoElements.forEach( (ele) =>{
            observerObject.observe(ele) ; 
        } )
    })

    return (
    <div>
      <div className="video-container">
        <Video src={v1} id="a" />
      </div>
      <div className="video-container">
        <Video src={v2} id="b" />
      </div>
      <div className="video-container">
        <Video src={v3} id="c" />
      </div>
      <div className="video-container">
        <Video src={v4} id="d" />
      </div>
    </div>
  );
};

function Video(props) {
  return (
    <video
      id={props.id}
      className="video-styles"
      muted="true"
      controls="controls"
    >
      <source src={props.src} type="video/mp4"></source>
    </video>
  );
}

export default IntersectionObserverDemo;
