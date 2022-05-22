import Link from "next/link";
import axios from "axios";

const Detail = ({ movieDetail: { original_title, poster_path, overview } }) => {
  return (
    <>
      <div className="card">
        <h1>{original_title}</h1>
        <div className="detail">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={original_title}
          />
          <p>{overview}</p>
        </div>
        <Link href="/">
          <button>ga terug</button>
        </Link>
      </div>
    </>
  );
};

export default Detail;

export async function getStaticPaths() {
  const {
    data: { results: popularMovies },
  } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=1d35e1139954b4b4f1226b5e94dd5ac2&language=en-US&page=1`
  );
  return {
    paths: popularMovies.map(popularMovie => ({
      params: { movieId: popularMovie.id.toString() },
    })),
    fallback: "blocking",
  };
}
export async function getStaticProps(ctx) {
  const id = ctx.params.movieId;
  const { data: movieDetail } = await axios(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1d35e1139954b4b4f1226b5e94dd5ac2&language=en-US`
  );
  return {
    props: {
      movieDetail,
    },
    revalidate: 60 * 60 * 24,
  };
}
