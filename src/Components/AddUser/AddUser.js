import React, { useState } from "react";
import "./AddUserStyle/AddUserStyle.css";
import {useDispatch } from "react-redux";
import { putData } from "../../server";
import { push } from "../reducer/userSlice";
import {Button, TextField} from "@mui/material";


const AddUser = () => {

  const userData = {
    data: {
      name: '',
      email: '',
      phone: '',
      surname: '',
      address: ''
    },
  };
  const [user, setUser] = useState(userData);
  const [bool, setBool] = useState(false);
  const dispatch = useDispatch();
  const arrKeys = ['name','email','phone','surname','address']
  const handleChange = (e) => {
    const { name, value } = e.target;
    return setUser({
      ...user,
      data: {
        ...user.data,
        [name]: value,
      },
    });
  };
  const handleSubmit = (e) => {
    let copy = { data: {} };
    e.preventDefault();
    for (const [key, value] of Object.entries(user.data)) {
      if (value.length >= 1) copy.data[key] = value;
    }
    delete copy.data.isReady;
    
    if (Object.keys(copy.data).length >= 1) {
      setBool(false);
      return putData(copy).then((data) => {
        dispatch(push(data))
        return setUser(userData)
      });
    } else setBool(true);
  };

  return (
      <form className="addUserBar">
        <h2>new user</h2>
        <div className={'addUserBar_inputField'}>
          {arrKeys.map((data)=> {
            const stringUpperCase = () => data.charAt(0).toUpperCase() + data.slice(1)
            return <TextField key={data} error={bool} helperText={bool && 'Введите данные'} label={stringUpperCase()} variant={'outlined'} name={data} type="text" onChange={handleChange} value={user.data[data]}/>
          })}
        </div>
        <Button variant={'outlined'} className={'addUserBar_button'} color={'inherit'} onClick={handleSubmit}>send</Button>
      </form>
  );
};

export default AddUser;
