import { defineStore } from 'pinia';
import appSetting from '@/app-setting';
export const useAppStore = defineStore('app', {
    state: () => ({
        liveUrl: "http://127.0.0.1:8000/",
        cdnPath: "https://cdn.arabsstock.com/",
        isDarkMode: false,
        mainLayout: 'app',
        theme: 'light',
        menu: 'vertical',
        layout: 'full',
        rtlClass: 'ltr',
        animation: '',
        navbar: 'navbar-sticky',
        locale: 'ar',
        sidebar: false,
        languageList: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'Arabic' },
        ],
        isShowMainLoader: true,
        semidark: false,
    }),

    actions: {
        setMainLayout(payload: any = null) {
            this.mainLayout = payload; //app , auth
        },
        toggleTheme(payload: any = null) {
            payload = payload || this.theme; // light|dark|system
            localStorage.setItem('theme', payload);
            this.theme = payload;
            if (payload == 'light') {
                this.isDarkMode = false;
            } else if (payload == 'dark') {
                this.isDarkMode = true;
            } else if (payload == 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.isDarkMode = true;
                } else {
                    this.isDarkMode = false;
                }
            }

            if (this.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu(payload: any = null) {
            payload = payload || this.menu; // vertical, collapsible-vertical, horizontal
            this.sidebar = false; // reset sidebar state
            localStorage.setItem('menu', payload);
            this.menu = payload;
        },
        toggleLayout(payload: any = null) {
            payload = payload || this.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            this.layout = payload;
        },
        toggleRTL(payload: any = null) {
            payload = payload || this.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            this.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', this.rtlClass || 'ltr');
        },
        toggleAnimation(payload: any = null) {
            payload = payload || this.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            this.animation = payload;
            appSetting.changeAnimation();
        },
        toggleNavbar(payload: any = null) {
            payload = payload || this.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            this.navbar = payload;
        },
        toggleSemidark(payload: any = null) {
            payload = payload || false;
            localStorage.setItem('semidark', payload);
            this.semidark = payload;
        },
        toggleLocale(payload: any = null, setLocale: any) {
            payload = payload || this.locale;
            localStorage.setItem('i18n_locale', payload);
            this.locale = payload;
            setLocale(payload);
            if(this.locale?.toLowerCase() === 'ar') {
                this.toggleRTL('rtl');
            }else {
                this.toggleRTL('ltr');
            }
        },
        toggleSidebar(state: boolean = false) {
            this.sidebar = !this.sidebar;
        },
        toggleMainLoader(state: boolean = false) {
            this.isShowMainLoader = true;
            setTimeout(() => {
                this.isShowMainLoader = false;
            }, 500);
        },
    },
    getters: {},
});