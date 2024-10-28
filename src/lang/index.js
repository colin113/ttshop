// index.ts
import {createI18n} from 'vue-i18n';
import zh from './zh';
import en from './en';
import han from './han';
import ri from './ri';
import tai from './tai';
import ind from './ind';
import vi from './vi';
import de from './de';
import es from './es';
import fr from './fr';
import vn from './vn';
import tr from './tr';
import ae from './ae';
import hant from './hant';
import ir from './ir';
import it from './it';
import pt from './pt';
import ru from './ru';

const messages = {
    en,
    "zh-CN": zh,
    han,
    ri,
    tai,
    ind,
    vi,
    de,
    es,
    fr,
    vn,
    tr,
    ae,
    hant,
    ir,
    it,
    pt,
    ru,
};
// const language = localStorage.getItem('lang') || 'zh' // 这是获取浏览器的语言
const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
    // locale: language || 'zh', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'zh-CN', // 设置备用语言
    messages,
    legacy: false,
    globalInjection:true,
})

console.log("file_name----11:"+localStorage.getItem('lang'))
// localStorage.setItem('lang', language);
export default i18n
