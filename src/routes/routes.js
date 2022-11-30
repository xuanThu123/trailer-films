import {
    Home,
    MoviePopular,
    NowPlaying,
    UpComing,
    MovieTopRated,
    TvPopular,
    AiringToday,
    TvTopRated,
    OnTv,
    MovieDetail,
    TvShowDetail,
    Login,
    Register,
} from '~/pages';

export const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

export const privateRoutes = [
    { path: '/', component: Home },
    { path: '/movie', component: MoviePopular },
    { path: '/movie/now-playing', component: NowPlaying },
    { path: '/movie/upcoming', component: UpComing },
    { path: '/movie/top-rated', component: MovieTopRated },
    { path: '/movie/:id', component: MovieDetail },

    { path: '/tv', component: TvPopular },
    { path: '/tv/airing-today', component: AiringToday },
    { path: '/tv/top-rated', component: TvTopRated },
    { path: '/tv/on-the-air', component: OnTv },
    { path: '/tv/:id', component: TvShowDetail },
];
