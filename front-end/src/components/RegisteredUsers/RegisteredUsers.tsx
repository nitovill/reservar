import React, {useState ,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from "../../firebase/index";
import {getUsersList} from '../../actions/index'
import style from './RegisteredUsers.module.css'

const RegisteredUsers = ({setSection}) => {

const auth = useAuth()
const dispatch = useDispatch()
const history = useHistory()
const listOfUsers = useSelector((state:any) => state.listOfUsers)
const [currentPage, setCurrentPage] = useState(0)
useEffect(() => {
    dispatch(getUsersList())
}, [dispatch])

console.log(listOfUsers)
const filteredUsers = listOfUsers.slice(currentPage, currentPage + 8)
    

    const nextPage = () => {
        if (listOfUsers.length < currentPage + 8) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage + 8)
        }
    }

    const prevPage = () => {
        if (currentPage < 7) {
            setCurrentPage(0)
        } else {
            setCurrentPage(currentPage - 8)
        }
    }

    const goBack = () => {
        setSection("")
    }

    return (
        <div className={style.ctn}>
            <button onClick={() => {goBack()}}>Back</button>
            <div className={style.userCtn}>
            {
                filteredUsers?.map((e) => {
                    return (
                            <Link to={`/userAdmin/${e._id}`}  className={style.userInfo} key={e._id}>
                                <p className={style.data}><b>Name:</b> {e.name} </p>
                                <p className={style.data}><b>Email:</b> {e.email} </p>
                                <p className={style.data}><b>Id:</b> {e._id} </p>
                            </Link>
                    )
                })
            }
            </div>
            { listOfUsers.length > 7 ? <div className={style.buttonPag}>
                {currentPage !== 0 ? <button
                    className={style.prevButton}
                    onClick={ prevPage }
                >
                    {'<'}
                </button> : <div></div>}
                {currentPage < listOfUsers.length-9 ? <button
                    className={style.nextButton}
                    onClick={ nextPage }
                >
                    {'>'}
                </button> : <div></div> }
            </div> : <div></div> }
        </div>
    )
}

export default RegisteredUsers