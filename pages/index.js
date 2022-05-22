import Link from "next/link";
import axios from "axios";

const home = ({ popularMovies }) => {
  return (
    <>
      <h1 className="title">Popular Movies</h1>
      <section className="wrap">
        {popularMovies.map(({ id, original_title, poster_path }) => (
          <article key={id}>
            <Link href={`/popular_movies/${id}`}>
              <a>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={original_title}
                />
                <h3>{original_title}</h3>
                <p>{}</p>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default home;

export const getStaticProps = async () => {
  const {
    data: { results: popularMovies },
  } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=1d35e1139954b4b4f1226b5e94dd5ac2&language=en-US&page=1`
  );
  return {
    props: {
      popularMovies,
    },
    revalidate: 60 * 60 * 24,
  };
};
