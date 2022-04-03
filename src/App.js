import React from 'react';

import './App.css';
import AddUser from './Components/AddUser/AddUser';
import UserBar from './Components/UserBar/UserBar';
import './Components/ResponsiveStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_SHOW} from "./Components/reducer/MenuButtonSlice";
import {CSSTransition} from "react-transition-group";

function App () {
    const dispatch = useDispatch()
    const buttonMenu = useSelector(state=>state.MenuButton)
    return (
      <div className="container">
          <IconButton edge="start" id={'menuButton'} color="inherit" aria-label="menu" onClick={()=>dispatch(TOGGLE_SHOW())}>
          <MenuIcon/>
      </IconButton>
        <h1>CRUD App</h1>
        <div className="container__item">
            <CSSTransition
            in={buttonMenu.value}
            timeout={300}
            classNames={'buttonMenu'}
            >
                {<AddUser />}
            </CSSTransition>
            {!buttonMenu.value && <UserBar />}
        </div>
      </div>
    );
  
}

export default App;
