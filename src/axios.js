import axios from 'axios';
const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
// const url = 'https://tw.rter.info/capi.php?=1568944322585'; // origin api url
const url = `https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json`;

const instance = axios.create({
    baseURL: `${cors}${url}`
})

export default instance;
