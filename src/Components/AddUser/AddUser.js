import React from "react";
import "./AddUserStyle/AddUserStyle.css";
import {useDispatch} from "react-redux";
import {putData} from "../../server";
import {push} from "../reducer/userSlice";
import {Button, TextField} from "@mui/material";
import * as yup from 'yup'
import {Formik} from 'formik';

const schema = yup.object().shape({
    name: yup.string().required('Необходимое поле Name'),
    email: yup.string().email().required('Необходимое поле Email'),
    telephone: yup.number().max(11).min(7),
    surname: yup.string(),
    // address: yup.string()
})

const AddUser = () => {
    const dispatch = useDispatch();
    const arrKeys = ['name', 'email', 'telephone', 'surname', 'address']
    const init = {
        name: '',
        email: '',
        telephone: '',
        surname: '',
        address: ''
    }
    return (
        <div className="addUserBar">
            <h2>new user</h2>
            <Formik
                initialValues={init}
                validationSchema={schema}
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values,actions) => {
                    const userData = {data: {}}
                    for (const [key, value] of Object.entries(values)) {
                        if (value.length >= 1) userData.data[key] = value;
                    }
                    return putData(userData).then((data) => {
                        dispatch(push(data.data))
                        actions.resetForm()
                    }).catch(error=>console.error(error))
                }}
            >
                {(formik) => {
                    return (<form className={'addUserBar_inputField'} onSubmit={formik.handleSubmit}>
                        {arrKeys.map((data) => {
                            const stringUpperCase = () => data.charAt(0).toUpperCase() + data.slice(1)
                            return <TextField helperText={formik.errors[data] !== undefined && formik.errors[data]}
                                              type={data} key={data} label={stringUpperCase()}
                                              variant={'outlined'} name={data} onChange={formik.handleChange}
                                              value={formik.values[data]}/>
                        })}<Button onKeyDown={()=> formik.handleSubmit} variant={'outlined'} className={'addUserBar_button'} type={'submit'}
                                   color={'inherit'}
                    >send</Button>
                    </form>)
                }}
            </Formik>

        </div>
    );
};

export default AddUser;
