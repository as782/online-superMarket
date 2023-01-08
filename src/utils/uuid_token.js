//引入生成随机字符串模块
import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    //生成的uuid存储在本地,所以先判断本地是否存在uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 没有 就生成
    if (!uuid_token) {
        uuid_token = uuidv4()
        //存储到本地
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}