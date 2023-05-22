import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ProductSkeleton = () => {
    return (

        <div className="col-xl-3 col-6 col-grid-box">
            <div className="product-box">
                <Skeleton height={250} count={1} className="skeleton-cont"></Skeleton>
                <Skeleton height={10} count={1} width={150}></Skeleton>
                <Skeleton height={10} count={2} width={90}></Skeleton>
            </div>
        </div>
    )
}

export default ProductSkeleton;