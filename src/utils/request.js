import axios from "axios";

import {notification} from 'ant-design-vue';

function request(options) {
    return axios(options).then(res => res).catch(error => {
        const { code, message, config: { url } }= error;

        notification.error({
            // eslint-disable-next-line no-unused-vars
            message: h=> (
                <div>
                    请求错误<span style="color: red;">{ code }</span> : { url }
                </div>
            ),
            description: message,
        });

        return Promise.reject(error)
    });
}

export default request;