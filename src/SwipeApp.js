import React from 'react';
import Swipe from 'react-easy-swipe';
import './App.css'



const App = () => {

    const [isSwipeLeft, setSwipeLeft] = React.useState(false)

    const onSwipeStart = (event) => {
      console.log('Start swiping...', event);
    }
  
    const onSwipeMove = (position, event) => {
        console.log(`Moved ${position.x}`)
      
    }
  
    const onSwipeEnd = (event) => {
      console.log('End swiping...', event);
    }

    const onSwipeLeft = (position, event) => {
        console.log(document.getElementsByClassName('add')[0].style.width)
        document.getElementsByClassName('add')[0].style.width = "100px"
    }

    const onSwipeRight = () => {
        document.getElementsByClassName('add')[0].style.width = "0px"
    }

    const boxStyle = {
        backgroundColor:'gray',
      };

      const container = {
          width:'150px',
          backgroundColor:'red',
          display:'flex',
          flexDirection:'row'
      }

      
    const additional = {
        width:'0px',
        overflow:'hidden',
        backgroundColor:'powderblue',
        transition:'.5s'
    }
  
      return (
        <Swipe
          onSwipeStart={onSwipeStart}
          //onSwipeMove={onSwipeMove}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          onSwipeEnd={onSwipeEnd}
          allowMouseEvents>
            <div style={container}>
                <div style={boxStyle}>Open the console and swipe </div>
                <div class="add" style={additional}>test</div>
            </div>
        </Swipe>
      );
    }

    export default App;