import axios from 'axios';

export const singleRequest = async (url: string) => {

    const data = { link: url };


    try {
        const res = await axios.post('http://localhost:8080/geturls', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const downloadFile = async (url: string) => {
    try {
        const data = await axios.get(url, {
            responseType: 'blob',
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}