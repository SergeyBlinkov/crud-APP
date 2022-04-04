import React, {useState, useEffect} from "react";
import "./UserBarStyle/UserBarStyle.css";
import {useSelector, useDispatch} from "react-redux";
import {getData, itemRemove, itemUpdate} from "../../server";
import {inits, del, changeBool, upd, saveUpdate} from "../reducer/userSlice";
import {DropdownButton} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import {Button, TextField} from "@mui/material";


const UserBar = () => {
    const userData = useSelector((state) => state.user.value);
    const [options, setOptions] = useState([])
    const arrKeys = ['name', 'surname', 'email', 'telephone', 'address']
    const init = {
        data: {},
    };
    // собираем ключи и удаляем один отвечающий за отслеживание кнопки( что бы не попал на сервер )
    const iniState = (ini) => {
        let data = {data: {}};
        for (const [key, value] of Object.entries(ini)) {
            data.data[key] = value;
        }
        delete data.data.isReady;
        return setListData(data)
    };
    const [listData, setListData] = useState(init);
    const dispatch = useDispatch();
     useEffect(() => {
         getData().then((data) => {
             dispatch(inits(data))
         });
         //eslint-disable-next-line
     }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        return setListData(() => ({
            ...listData, data: {
                ...listData.data, [name]: value,
            },
        }));
    };
    const FillOptionFunc = (data) => {
        let copy = Object.keys(data.data)
        copy.pop()
        let array = arrKeys.filter(list => !copy.includes(list))
        setOptions(array)
    }
    return (
        <div className={'userBar'}>
            <h2>view user</h2>
            <div className="list-content">
                {userData.map((data, index) => {
                    return (<div className="userLine" key={index} id={data._id}>
                        <div className="block-text">
                            {arrKeys.map((someKeys) => {
                                const stringUpperCase = () => someKeys.charAt(0).toUpperCase() + someKeys.slice(1)
                                return someKeys in data.data ? (<div className="user-item " key={someKeys}>
                                    <TextField
                                        disabled={data.data.isReady}
                                        type="text"
                                        value={data.data.isReady ? data.data[someKeys] : listData.data[someKeys]}
                                        name={someKeys}
                                        readOnly={data.data.isReady}
                                        label={stringUpperCase()}
                                        onChange={handleChange}
                                    />
                                    {data.data.isReady ? '' : <Button size='sm'
                                                                      variant={'outlined'}
                                                                      color={'inherit'}
                                                                      onClick={() => {
                                                                          let copy = {...listData}
                                                                          copy._id = data._id
                                                                          delete copy.data[someKeys]
                                                                          return itemUpdate(copy).then(() => {
                                                                              dispatch(upd(copy));
                                                                          });
                                                                      }}>Delete</Button>}
                                </div>) : null
                            })}
                        </div>
                        <div className={'block-button'}>
                            {data.data.isReady ? (
                                <Button
                                    className="btn"
                                    variant={'outlined'}
                                    color={'inherit'}
                                    onClick={() => {
                                        iniState(data.data)
                                        return dispatch(changeBool(data));
                                    }}
                                >
                                    Edit
                                </Button>) : (<Button
                                className="btn"
                                variant={'outlined'}
                                color={'inherit'}
                                onClick={() => {
                                    listData._id = data._id;
                                    let copy = {...listData}
                                    itemUpdate(copy).then(() => dispatch(saveUpdate(copy)));
                                }}
                            >
                                Save
                            </Button>)}
                            <Button className="btn"
                                    variant={'outlined'}
                                    color={'inherit'}
                                    onClick={() => {
                                        itemRemove(data._id).then(() => {
                                            dispatch(del(data._id));
                                        });
                                    }}
                            >
                                Delete
                            </Button>
                            {data.data.isReady ? ("") : (<DropdownButton
                                onClick={()=>FillOptionFunc(data)}
                                className={'dropdown-button'}
                                variant='secondary' title='Add'>
                                {options.map((line) => {
                                    return <Dropdown.Item key={line}
                                                          onClick={() => {
                                                              let copy = {
                                                                  ...listData, data: {
                                                                      ...listData.data, [line]: 'add'
                                                                  }
                                                              }
                                                              copy._id = data._id;
                                                              setListData(copy)
                                                              return itemUpdate(copy).then(() => {
                                                                  dispatch(upd(copy));
                                                              });
                                                          }}>{line}</Dropdown.Item>
                                })}
                            </DropdownButton>)}
                        </div>
                    </div>);
                })}
            </div>
        </div>);
};

export default UserBar;
