import style from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ handleLoadMore, isLoading }) {
  return (
    <button
      className={style.loadMore}
      onClick={handleLoadMore}
      disabled={isLoading}
    >
      더보기
    </button>
  );
}

export default LoadMoreBtn;
