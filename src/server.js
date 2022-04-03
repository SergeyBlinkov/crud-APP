export const getData = () => {
    return fetch('http://178.128.196.163:3000/api/records')
        .then(response => response.json())
        .then(data => data.filter((obj) => typeof (obj.data) === 'object'))
        .catch((error) => console.log(error))
}
export const itemRemove = (id) => {
    return fetch('http://178.128.196.163:3000/api/records/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then()
        .catch((error) => console.log('error', error))
}
export const putData = (user) => {
    return fetch("http://178.128.196.163:3000/api/records/", {
        method: "PUT", headers: {"content-type": "application/json"}, body: JSON.stringify(user)
    })
        .then((response) => response.json())
        .catch((error) => console.log('error', error))
};

export const itemUpdate = (credentials) => {
    return fetch('http://178.128.196.163:3000/api/records/' + credentials._id, {
        method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(credentials)
    })
        .then((response) => response.json())
        .then()
        .catch((error) => console.log('error', error))
}
  

