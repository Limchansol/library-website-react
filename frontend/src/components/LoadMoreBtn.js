import style from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ handleLoadMore }) {
  return (
    <button className={style.loadMore} onClick={handleLoadMore}>
      더보기
    </button>
  );
}

export default LoadMoreBtn;
