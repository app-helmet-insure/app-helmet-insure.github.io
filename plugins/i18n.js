import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
let StorageLang;
if (process.client) {
    StorageLang = window.localStorage.lang;
}
export default ({ app, store }) => {
    let locale = store.state.locale;
    app.i18n = new VueI18n({
        locale: StorageLang || locale,
        fallbackLocale: StorageLang || locale,
        messages: {
            en_US: require('~/locales/en_US.json'),
            zh_CN: require('~/locales/zh_CN.json'),
            ko_KR: require('~/locales/ko_KR.json'),
            es_MX: require('~/locales/es_MX.json'),
            ja_JP: require('~/locales/ja_JP.json'),
            fr_FR: require('~/locales/fr_FR.json'),
            en_ID: require('~/locales/en_ID.json'),
            fa_IR: require('~/locales/fa_IR.json'),
        },
    });

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`;
        }
        return `/${app.i18n.locale}/${link}`;
    };
};
