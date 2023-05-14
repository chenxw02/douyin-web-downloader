import axios from 'axios';

export const singleRequest = async (url: string) => {

    const data = { link: url };

    // 按照换行符分割字符串
    const urlList = url.split('\n');

    try {
        const res = await axios.post('http://localhost:8080/geturls', data);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const download_one =async (url:string) => {
    const data = { link: url };
    try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8080/download_one',
            responseType:  'blob',
            data: data
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const muti_url = async (url:string) => {
    const data = {link:url}
    try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8080/download_all',
            responseType: 'blob',
            data: data
        })
        return res
    } catch (error) {
        console.log(error)
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