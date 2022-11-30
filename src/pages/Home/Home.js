import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import className from "classnames/bind";

import Slider from "./Tabs/Slider";
import {
  moviePopularSelector,
  tvShowPopularSelector,
  trendingWeekSelector,
  trendingDaySelector,
} from "~/app/store/selector";
import { controlSearchBox } from "~/components/SearchFeature/searchSlice";
import { getMoviePopular } from "../Movies/movieSlice";
import { getTvShowPopular } from "../TvShow/tvShowSlice";
import { getTrendingOfWeek, getTrendingOfDay } from "./trendingSlice";
import styles from "./Home.module.scss";

const cx = className.bind(styles);
function Home() {
  const dispatch = useDispatch();
  const moviePopular = useSelector(moviePopularSelector);
  const tvShowPopular = useSelector(tvShowPopularSelector);
  const trendingWeek = useSelector(trendingWeekSelector);
  const trendingDay = useSelector(trendingDaySelector);

  useEffect(() => {
    dispatch(controlSearchBox(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useMemo(
    () => ({
      api_key: process.env.REACT_APP_API_KEY,
      language: "en-US",
      page: 1,
    }),
    []
  );

  const banners = useMemo(
    () => [
      "8bcoRX3hQRHufLPSDREdvr3YMXx.jpg",
      "kf456ZqeC45XTvo6W9pW5clYKfQ.jpg",
      "hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg",
      "5GISMqlRXMEyBrgEqyvhaMMuQmJ.jpg",
      "8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
    ],
    []
  );

  const style = useMemo(
    () => ({
      backgroundImage: `
        linear-gradient(
            90deg,
            rgba(3,37,65, 0.8),
            rgba(3,37,65, 0)
          ),
          url("https://image.tmdb.org/t/p/original/${
            banners[Math.floor(Math.random() * banners.length)]
          }")
        `,
    }),
    [banners]
  );

  useEffect(() => {
    dispatch(getMoviePopular(params));
    dispatch(getTvShowPopular(params));
    dispatch(getTrendingOfWeek({ api_key: process.env.REACT_APP_API_KEY }));
    dispatch(getTrendingOfDay({ api_key: process.env.REACT_APP_API_KEY }));
  }, [dispatch, params]);

  return (
    <div className={cx("wrapper")}>
      <section className={cx("banner")} style={style}>
        <div className={cx("modal")}></div>
        <div className={cx("title")}>
          <h1>Welcome.</h1>
          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
      </section>
      <section className={cx("inner-content")}>
        <Slider
          name="What's Popular"
          tabs={[
            { tab: "In Theaters", key: "movie", data: moviePopular },
            { tab: "On TV", key: "tv", data: tvShowPopular },
          ]}
        />
      </section>
      <section className={cx("inner-content")}>
        <Slider
          name="Trending"
          tabs={[
            { tab: "Today", key: "day", data: trendingDay },
            { tab: "This Week", key: "week", data: trendingWeek },
          ]}
        />
      </section>
    </div>
  );
}

export default Home;
