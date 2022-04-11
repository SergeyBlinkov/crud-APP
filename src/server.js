import axios from "axios";
const baseUrl = 'https://crudcrud.com/api/db1b7c6053fd43809cba333da23c2c4e/crudApp/'
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin',baseUrl)


export const getData = () => {
    return axios.get(baseUrl)
        .then(response => response)
        .then(data => data.data.filter((obj) => {
            return typeof (obj.data) === 'object'
        }))
        .catch((error) => console.error(error))
}
export const itemRemove = (id) => {
    return axios.delete(baseUrl + id)
        .then(response => response)
        .catch((error) => console.error('error >' + error))
}
export const putData = (data) => {
    return axios.post(baseUrl, data)
        .then((response) => response)
        .catch((error) => console.error('error', error))
};

export const itemUpdate = (data) => {
    return axios.put(baseUrl + data._id, {data: data.data})
        .then((response) => response)
        .catch((error) => console.error('error', error))
}
  
