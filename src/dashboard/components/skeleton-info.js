import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const SkeletonInfo = () => {
 return (
    <div>
        <div className="welcome-msg">
            <Skeleton height={13} width={80} className="pr-one"></Skeleton>
            <Skeleton height={15} width={600} className=""></Skeleton>
            <Skeleton height={15} width={200} className="pr-one"></Skeleton>
        </div>
        <div className="row">
            <div className="col-md-4">
              <div className="counter-box">
                 <Skeleton height={120} width={250} className="product-cart"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="counter-box">
                 <Skeleton height={120} width={250} className="product-cart"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="counter-box">
                 <Skeleton height={120} width={250} className="product-cart"/>
              </div>
            </div>
        </div>
       
    </div>
 )
}

export default SkeletonInfo;