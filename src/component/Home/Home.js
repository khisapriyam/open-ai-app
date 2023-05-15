import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Home.css';
import { Link } from 'react-router-dom'

const Home = () => {
    
    //useState
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    
    //alert management
    const [ alert, setAlert] = useState({
        msg : 'This is an alert',
        type : 'danger',
        status: false
    });

    //alert close
    const handleALertClose = () => {
        setAlert({
            msg : '',
            type: 'danger',
            status: false
        })
    }

    //submitting form
    const handleFormSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        })
            .then((res) => res.json())
            .then((data) => setResponse(data.message))

        //alert message if input field is empty
        if( message === ''){
            setAlert({
                msg : 'Input field can not be empty',
                type: 'danger',
                status: true
            })
        }
        else{
           
            //clearing fields after typing message
            setMessage('')   
        }   
    }


  return (
    <>
        <div className="main">
            <div className='wrapper'>
                <div className='navbar'>
                    <ul>
                        <li><Link to='/'><FontAwesomeIcon icon={faRobot} /></Link></li>
                        <li><a href="#"><FontAwesomeIcon icon={faUsers} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faEnvelope} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={ faChartBar} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faBox} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faBell} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faCog} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faUser} /></a></li>
                    </ul>
                </div>
            </div>
            <div className="container">
                {
                    alert.status && <p className={ `alert alert-${alert.type} d-flex justify-content-between` } >{ alert.msg } <button onClick={ handleALertClose }
                    className='btn-close'></button></p>
                }

                <h1>OpenAI Playground UI</h1>
                <label for="prompt">Enter your prompt:</label>
                <form onSubmit={handleFormSubmit}> 
                    <div className="my-3">
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} placeholder="Enter your prompt">
                        </textarea>
                    </div>
                    <button className="btn btn-primary" type='submit' > Submit</button>
                </form>
                <br/>
                <div className="output-text">{response}</div>
            </div>
        </div>
    </>
  )
}

export default Home



