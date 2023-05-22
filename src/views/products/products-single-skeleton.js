import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
const SingleProductSkeleton = () => {
  return (
    <div className="row w-100">
    <div className="container-fluid p-0">
        <div className="col-lg-9 col-sm-12 col-xs-12">
            <div className="row w-100 mx-0">
                <div className="col-lg-6">
                    <div className="products-wrp">
                        <Skeleton height={270} count={1} ></Skeleton>
                    </div>
                </div>


                <div className="col-lg-6 pr-0">
                    <div className="product-right">
                        <div className="">
                            <Skeleton
                                height={30}
                                count={1}
                                width={95}
                                className="pr-one"
                            ></Skeleton>

                            <div className="product-mid">

                                <Skeleton height={15} count={1} width={200} className="pr-one"></Skeleton>
                                <Skeleton
                                    height={25}
                                    count={1}
                                    width={220} npm
                                    className="pr-one"
                                ></Skeleton>
                                <Skeleton height={1} count={1}></Skeleton>
                                <Skeleton height={10} width={80}></Skeleton>
                                <Skeleton height={40} width={155} borderRadius={0} className="pr-one"></Skeleton>
                                <div className="product-circle-wrap pr-one w-100">
                                    <div className="product_btn product-cart">
                                        <Skeleton
                                            height={44}
                                            count={1}

                                            borderRadius={0}
                                            className="product-cart product_btn"
                                        ></Skeleton>
                                    </div>
                                    <div className="product_btn2">
                                        <Skeleton
                                            height={44}
                                            count={1}
                                            className="product-cart product_btn"
                                            borderRadius={0}
                                        ></Skeleton>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default SingleProductSkeleton;
