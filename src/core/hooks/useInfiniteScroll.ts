import { useState, useRef, useCallback, useEffect } from "react"

function useInfiniteScroll() {
  const [page, setPage] = useState(0)
  const loadMoreRef = useRef(null)

  const handleObserver = useCallback((entries: any) => {
    const [target] = entries
    if (target.isIntersecting) setPage((p) => p + 1)
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, option)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
  }, [handleObserver])

  const reset = useCallback(() => {
    setPage(0)
  }, [setPage])

  return { loadMoreRef, page, reset }
}

export default useInfiniteScroll
