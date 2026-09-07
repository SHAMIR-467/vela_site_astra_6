import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ProductCanvas = lazy(() => import("./ProductCanvas"));
export default function ProductView(props) {
  const host = useRef();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, {rootMargin: '180px'});
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="product-view">
    <Suspense
      fallback={
        <div
          className="product-canvas product-loading"
          aria-label="Loading interactive product"
        >
          <span className="loading-ring" />
        </div>
      }
    >
      {ready ? <ProductCanvas {...props} /> : <div className="product-canvas product-loading"><span className="loading-ring"/></div>}
    </Suspense>
    </div>
  );
}
