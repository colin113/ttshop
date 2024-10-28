import {defineStore} from 'pinia';
import {getMerInfo, login, orderManagement} from "@/api/index.js";
import {useRouter} from "vue-router";
import {showSuccessToast} from "vant";


export const useUserStore = defineStore('user',
    () => {
        let token = ref('');
        let MerInfo = ref({});
        let data = ref('');
        const loginAction = async (data) => {
            const res = await login(data);
            // console.log(res.data.merinfo.token);
            console.log(res);
            if (res.code === 1) {
                token.value = res.data.merinfo.token;
                showSuccessToast(res.msg);
                router.push('/home');
            } else {
                showFailToast(res.msg);
            }
        };
        const toGetMerInfo = async () => {
            const res = await getMerInfo();
            MerInfo.value = res.data;
        };
        const router = useRouter();
        const nologin = () => {
            token.value = '';
            MerInfo.value = {};
            router.push('/login');
        };
        const total = ref('');
        const ordertotal = async () => {
            const res = await orderManagement({
                status: '5',
                page: '1',
                limit: '10',
            });
            total.value = res.data.total;
        };
        const pwd = ref('');
        return {token, MerInfo, loginAction, toGetMerInfo, nologin, ordertotal, total, pwd, data};
    },
    {
        persist: true
    }
);
