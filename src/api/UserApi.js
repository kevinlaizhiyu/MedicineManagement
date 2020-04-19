import Axios from '../utils/axios'
class UserApi {
    list() {
        let url = 'http://47.97.244.129:3002/user/find'
        return Axios.get(url)
    }
}
export default new UserApi()