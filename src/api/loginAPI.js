import axios from '../utils/axios';

const HOST = 'http://47.97.244.129:3002'

class Login {
    login(payload) {
        let url = `${HOST}/admin/login`
        return axios.post(url, payload)
    }
}
export default new Login()