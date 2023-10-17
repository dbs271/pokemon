import { InView } from "react-intersection-observer";

const UseObserver = ({ onClick, isFetchingNextPage }) => {
  return (
    <InView
      as="div"
      onChange={(inView, entry) => {
        if (inView && !isFetchingNextPage) {
          onClick();
        }
      }}
    >
      {isFetchingNextPage ? "Loading more" : ""}
    </InView>
  );
};

export default UseObserver;
