import React, {useState} from 'react'


export default function BoxAddMember(props) {
    const [isVisible, setIsVisible] = useState(true)
    const {user, index} = props
    const handleButton = (e)=>{
        e.preventDefault()
        const key = e.target.parentElement.getAttribute('index')
        props.handleAdd(key)
        setIsVisible(false)
    }

    return (

              <div index={index} style={{marginRight: '2vw', borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh'}} >
              <img src={user.img} style={{width: '10vw', height: 'auto'}}/>
              <p>{user.userName}</p>
              {isVisible ? <button style={{borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh'}} onClick={handleButton}>Add</button> : undefined}
              </div>
   
    )
}



{/* <div key={index} index={index} style={{marginRight: '2vw', borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh'}} >
<img src={user.img} style={{width: '10vw', height: 'auto'}}/>
<p>{user.userName}</p>
{this.state.buttonVisible ? <button style={{borderColor: '#09d3ac', background: 'black', color: 'white', boxShadow: '0 4px 8px 0 white, 0 6px 20px 0 #09d3ac', marginTop: '3vh', marginBottom: '3vh'}} onClick={this.addMember}>Add</button> : undefined}
</div> */}