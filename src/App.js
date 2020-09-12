import React from 'react';
import './App.css';
import {MdDone} from 'react-icons/md';
import {MdDelete} from 'react-icons/md';
import {AiOutlineLine} from 'react-icons/ai';
import {AiOutlineClockCircle} from 'react-icons/ai';
import Swipe from 'react-easy-swipe'; //for using react easy swipe

function App() {
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const [text, setText] = React.useState('')
  const [owner, setOwner] = React.useState('정기')
  const [list, setList] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
 // const [isLoading, setLoading] = React.useState(false)

  let StartTime = (e) => {
    setStartTime(e.target.value);
  }

  let EndTime = (e) => {
    setEndTime(e.target.value);
  }

  let Text = (e) => {
    setText(e.target.value);
  }

  let Owner = (e) => {
    setOwner(e.target.value);
  }

  const submitFunction = () => {
    //setLoading(true)
    
    fetch('https://nayoung-todo-backend.herokuapp.com/api/save/', {
      method:'POST',
      headers : { 
        'Content-Type': 'application/json',
       },
      body:JSON.stringify({
        startTime:startTime,
        endTime:endTime,
        content:text,
        state:0,
        owner:owner,
      })
    })
    .then(res => res.json())
    .then(json => {
      
      alert(JSON.stringify(json))
      clearInput();
      //setLoading(false)
      getList()

    })
    .catch((e) => alert(e))
  }

  const getList = () => {
    setLoading(true)
    fetch('https://nayoung-todo-backend.herokuapp.com/api/call/', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        owner:owner
      })
    })
    .then(response => response.json())
    .then(json => {
      setList(json.data)
      setLoading(false)
    })
    .catch(e=>console.log(e))
  }

  React.useEffect(() => {
    getList();       
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner])

  React.useEffect(() => {
    window.Kakao.init('c5c2971685be0d635f82fa9e5c7a0c7f')
  },[])

  const removeHide = (index) => {
    const list = document.getElementsByClassName('todoList')
    //const check = document.getElementById('check')
    //console.log(list[index].childNodes[0].classList)
    list[index].childNodes[0].classList.remove('hidden')
    //console.log(list[index].getElementsByClassName('state hidden')[0])
    //console.log(list[index].childNodes[4].classList.remove('hidden'))
    list[index].childNodes[4].classList.remove('hidden')
    
  }

  const addHide = (index) => {
    const list = document.getElementsByClassName('todoList')
    //const check = document.getElementById('check')
    console.log(list[index].childNodes[0].classList)
    list[index].childNodes[0].classList.add('hidden')
    list[index].childNodes[4].classList.add('hidden')
  }

  const removeList = (item) => {
    fetch('https://nayoung-todo-backend.herokuapp.com/api/remove/', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        id:item._id
      })
    })
    .then(response => response.json())
    .then(json => {
      alert('삭제 완료')
      getList()
    })
    .catch(e => console.log(e))
  }

  const changeDone = (item) => {
    fetch('https://nayoung-todo-backend.herokuapp.com/api/changeState/', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        id:item._id
      })
    })
    .then(response => response.json())
    .then(json => {
      alert('변경 완료')
      getList()
    })
  }

  const changeNothing = (item) => {
    fetch('https://nayoung-todo-backend.herokuapp.com/api/changeNothing/', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        id:item._id
      })
    })
    .then(response => response.json())
    .then(json => {
      alert('상태 변경')
      getList()
    })
    .catch(e=>console.log(e))
  }

  const removeAll = () => {
    fetch('https://nayoung-todo-backend.herokuapp.com/api/removeAll/', {
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        owner:owner
      })
    })
    .then(response => response.json())
    .then(json => {
      alert('전체 삭제 완료!')
      getList();
    })
    .catch(e=>console.log(e))
  }

  const clearInput = () => {
    const temp = document.getElementsByTagName("input")
    console.log(temp)
    for (let i = 0; i<temp.length;i++){
      if(temp[i].type === "text"){
        console.log(temp[i].value)
        temp[i].value = ""
      }  
    }
  }

  const onSwipeLeft = (index) => {
    console.log(document.getElementsByClassName('todoList')[index].childNodes[5].style.width)
    document.getElementsByClassName('todoList')[index].childNodes[5].style.width = "100px"
    //document.getElementsByClassName('todoList')[index].childNodes[5].style.display = "inline"
    //if(document.getElementsByClassName('todoList')[index].childNodes[5].classList.value ==="add"){
      //document.getElementsByClassName('todoList')[index].childNodes[5].classList.remove('add')
      //document.getElementsByClassName('todoList')[index].childNodes[5].classList.add('addswipe')
    
  }

  const onSwipeRight = (index) => {
    console.log(document.getElementsByClassName('todoList')[index].childNodes[5])
    document.getElementsByClassName('todoList')[index].childNodes[5].style.width="0px"
    //document.getElementsByClassName('todoList')[index].childNodes[5].style.display="none"
    //if(document.getElementsByClassName('todoList')[index].childNodes[5].classList.value === "addswipe"){
    //  document.getElementsByClassName('todoList')[index].childNodes[5].classList.remove('addswipe')
    //  document.getElementsByClassName('todoList')[index].childNodes[5].classList.add('add')
  }

  function TodoList() {
    const listItems = list.map((items, index) =>{
      if(items.state===0){
        return(
          <Swipe
          allowMouseEvents
          onSwipeRight={() => onSwipeRight(index)}
          onSwipeLeft={() => onSwipeLeft(index)}>
          <div class="todoList" onMouseOver={() => removeHide(index)} onMouseOut={() => addHide(index)}>
            <span id="btdelete" class="delete hidden" onClick={() => {alert('삭제 클릭'); removeList(items)}}><MdDelete size={20}/></span>
            <span id="listtime" class="todoItems"><AiOutlineClockCircle size={13}/>{items.startTime}~{items.endTime}</span>
            <span class="todoItemsContent">{items.content}</span>
            <span class="state" ><AiOutlineLine size={25}/></span>
            <span id="check" class="state hidden" onClick={() => changeDone(items)}><MdDone id="btDone" class="button" size={25}/></span>
            <div class="addswipe">
            <span id="mobilecheck" class="state" onClick={() => changeDone(items)}>
              <MdDone id="btDone" class="button" size={25}/>
            </span>
            <span id="mobilebtdelete" class="delete" onClick={() => {alert('삭제 클릭'); removeList(items)}}>
              <MdDelete size={20}/>
            </span>
            </div>
          </div>
          </Swipe>
          )
      } else {
        return(
          <Swipe
          allowMouseEvents
          onSwipeRight={() => onSwipeRight(index)}
          onSwipeLeft={() => onSwipeLeft(index)}>
          <div class="todoList" onMouseOver={() => removeHide(index)} onMouseOut={() => addHide(index)}>
            <span id="btdelete" class="delete hidden" onClick={() => {alert('삭제 클릭'); removeList(items)}}><MdDelete size={20}/></span>
            <span id="listtime" class="todoItems"><AiOutlineClockCircle size={13}/>{items.startTime}~{items.endTime}</span>
            <span class="todoItemsContent">{items.content}</span>
            <span class="state" ><MdDone size={25}/></span>
            <span id="check" class="state hidden" onClick={() => changeNothing(items)}><AiOutlineLine id="btNothing" class="button" size={25}/></span>
            <div class="addswipe">
            <span id="mobilecheck" class="state" onClick={() => changeNothing(items)}>
            <AiOutlineLine id="btNothing" class="button" size={25}/>
            </span>
            <span id="mobilebtdelete" class="delete" onClick={() => {alert('삭제 클릭'); removeList(items)}}>
              <MdDelete size={20}/>
            </span>
            </div>
          </div>
          </Swipe>
          )
      }
      
    }
    
      
      
    );
    return (
      
      <div>{listItems}</div>
      
    );
  }
  
  function sendLink(){
    const temp = []
    list.map((item, index) => (
      temp.push(`🥑${list[index].startTime}:${list[index].endTime} ${list[index].content}\n`)
    ))
    
    window.Kakao.Link.sendDefault({
      objectType:'text',
      buttonTitle:'일정 확인하기!',
      text:`${owner}${owner==="정기"?'🧏‍♂':'🧏‍♀'}님의 일정입니다!\n${temp}`,
      link:{
        mobileWebUrl:'https://developers.kakao.com/docs/js/kakaotalklink#텍스트-템플릿-보내기',
        webUrl:'https://developers.kakao.com/docs/js/kakaotalklink#텍스트-템플릿-보내기',
      },
    })
  }

  return (
    <center>
      <div id='container'>
        <div id="control">
          <select id="dropdown" value={owner} onChange={Owner}>
            <option class="dditem" value="정기">정기</option>
            <option class="dditem" value="나영">나영</option>
          </select>
          <input type="text" class="time" required minLength="4" maxLength="4" size="10" placeholder="시작" onChange={StartTime}></input>
          <span>~</span>
          <input type="text" class="time" required minLength="4" maxLength="4" size="10" placeholder="종료" onChange={EndTime}></input>
          <input type="text" id="content" required maxLength="100" size="10" placeholder="할 일을 입력해주세요" onKeyPress={() => {if(window.event.keyCode === 13){submitFunction()}}} onChange={Text}></input>
          <input type="button" onClick={() => {alert(owner);submitFunction()}} id="submitbutton" value="등록"/>
        </div>
        {isLoading?
        <>
        <div>로딩중입니다!</div>
        
        </>
        :(
          list.length===0?<div>일정이 없습니다.</div>:<div id="items">
          <TodoList/>
          </div>
        )
        
        }
        
        
        
        
        <div id="btnkakao" onClick={() => sendLink()}>
        <a id="kakao-link-btn" href="#!">
          <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" width="30" alt="web server error!" />
        </a>
        <span>일정 카카오톡으로 공유하기</span>
        </div>
        <div id="reset" onClick={() => removeAll()}>
          <a href="#!">
            <img src="https://www.flaticon.com/svg/static/icons/svg/2204/2204346.svg" width="30" alt="web server error"/>
          </a>
        <span>전체 삭제하기</span>
        </div>

      </div>
    </center>
      
  )
}

export default App;
