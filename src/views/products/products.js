import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import httpService from "../../services/http-service";
import CartService from "../../services/cartService";
import { useSearchParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import ProductItem from "./product-item";
import ProductSkeleton from "./product-skeleton";
import ProductquickView from "./product-quick-view";
import useGetPaginate from "../../hooks/usePaginate";
import Pagination from "react-js-pagination";

const Products = () => {
    let url = "";
    const [categoryUrl, setcategoryUrl] = useState(null);
    const [page, setPage] = useState(1);
    const [Loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [categories, setCategories] = useState([]);
    let addToCart = CartService.addCart;
    const [searchParams, setSearchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(0);
    const [modalproduct, setModalProduct] = useState({});
    let totalProducts = [];
    const [query, setQuery] = useState(searchParams.get("name"));
    const categoryQuery = searchParams.get("category");

    const getLimit = (inputLimit) => {
        setLimit(inputLimit);
        // getProducts(inputLimit);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value === "0") {
            setcategoryUrl("/products");
        } else {
            setcategoryUrl("/products/category/" + value);
        }
    };
    const getCategories = async () => {
        try {
            const response = await httpService.get("/categories");
            if (response.status === 200) {
                let all = {
                    name: "All",
                    slug: "all",
                    _id: "0",
                };
                setCategories([all, ...response.data.categories]);
            }
        } catch (e) {
            // toast.error("Oopps!, Network unavailable!");
            setLoading(false);
        }
    };
    const handleUrl = (url) => {
        if (categoryQuery) {
            url =categoryQuery ? "/products/category/" + categoryQuery : `/products?limit=${limit}`;
        }else{

            url = query ? `/products/filter?name=${query}` : `/products?limit=${limit}`;
        }
        let finaleUrl = categoryUrl ? categoryUrl : url;
        return finaleUrl;
    };
    const { data, total, current_page, Loading: loadingData, getData, per_page } = useGetPaginate(handleUrl(url));
    const handleProducts = (data) => {
        let temProducts = data ? data?.products : [];
        let temResult = temProducts.results ? temProducts.results : temProducts;
        let products = temResult ? temResult : [];
        return products;
    };
    let products = data ? handleProducts(data) : [];
    const getProducts = async (limit, filterByCategory = null) => {
        if (filterByCategory !== null) {
            url = "/products/category/" + filterByCategory;
        }
        try {
            const response = await httpService.get(url);
            if (response.status === 200) {
                totalProducts = response.data.total;
                var data = response.data.products;
                var result = data.results ? data.results : data;
                products = [...result];
                setLoading(false);
            }
        } catch (e) {
            toast.error("Oopps!, Network unavailable!");
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     getProducts(limit);
    // }, [url]);
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {/* section start */}

            <section className="section-b-space ratio_asos">
                <div className="collection-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3 collection-filter">
                                {/* side-bar colleps block stat */}
                                <div className="collection-filter-block">
                                    {/* brand filter start */}
                                    <div className="collection-mobile-back">
                                        <span className="filter-back">
                                            <i className="fa fa-angle-left" aria-hidden="true" /> back
                                        </span>
                                    </div>

                                    <div className="collection-collapse-block open">
                                        <h3 className="collapse-block-title">Categories</h3>
                                        <div className="collection-collapse-block-content">
                                            <div className="collection-brand-filter">
                                                {categories &&
                                                    categories.map((category, key) => (
                                                        <div key={key} className="form-check collection-filter-checkbox">
                                                            <input name="category" onClick={handleChange} type="radio" defaultValue={category._id} className="form-check-input" id={category._id} />
                                                            <label className="form-check-label" htmlFor={category._id}>
                                                                {category.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* silde-bar colleps block end here */}

                                {/* side-bar banner start here */}
                                <div className="collection-sidebar-banner">
                                    <a href="#">
                                        <img src="../assets/images/side-banner.png" className="img-fluid blur-up lazyload" alt="" />
                                    </a>
                                </div>
                                {/* side-bar banner end here */}
                            </div>
                            <div className="col-sm-12 col-lg-9">
                                <div className="collection-content col">
                                    <div className="page-main-content">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="collection-product-wrapper">
                                                    <div className="product-top-filter">
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="filter-main-btn">
                                                                    <span className="filter-btn btn btn-theme">
                                                                        <i className="fa fa-filter" aria-hidden="true" /> Filter
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="product-filter-content">
                                                                    <div className="search-count">
                                                                        <h5>Showing Products {current_page}-{total} Of {total} Result</h5>
                                                                    </div>
                                                                    <div className="collection-view">
                                                                        <ul>
                                                                            <li>
                                                                                <i className="fa fa-th grid-layout-view" />
                                                                            </li>
                                                                            {/* <li>
                                                                                <i className="fa fa-list-ul list-layout-view" />
                                                                            </li> */}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="collection-grid-view">
                                                                        <ul>
                                                                            <li>
                                                                                <img src="../assets/images/icon/2.png" alt="" className="product-2-layout-view" />
                                                                            </li>
                                                                            <li>
                                                                                <img src="../assets/images/icon/3.png" alt="" className="product-3-layout-view" />
                                                                            </li>
                                                                            <li>
                                                                                <img src="../assets/images/icon/4.png" alt="" className="product-4-layout-view" />
                                                                            </li>
                                                                            <li>
                                                                                <img src="../assets/images/icon/6.png" alt="" className="product-6-layout-view" />
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="product-page-per-view">
                                                                        <select onChange={(e) => getLimit(e.target.value)}>
                                                                            <option value="24">24 Products Par Page</option>
                                                                            <option value="50">50 Products Par Page</option>
                                                                            <option value="60">100 Products Par Page</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-wrapper-grid ">
                                                        {!loadingData && (
                                                            <div className="row margin-res">
                                                                {products && products.map((product, key) => <ProductItem key={key} product={product} setModalProduct={setModalProduct} />)}
                                                                {products.length < 1 && (
                                                                    <p className="text-center mt-4 text-lg " style={{ fontSize: "16px" }}>
                                                                        Products not available!
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="row">
                                                            {loadingData &&
                                                                Array.from(Array(8), (e, key) => {
                                                                    return <ProductSkeleton key={key} />;
                                                                })}
                                                        </div>
                                                    </div>
                                                    {!loadingData && (
                                                        <Pagination
                                                            activePage={page}
                                                            totalItemsCount={total}
                                                            itemsCountPerPage={per_page}
                                                            onChange={(pageNumber) => {
                                                                setPage(pageNumber);
                                                            }}
                                                            itemClassLast=""
                                                            // pageRangeDisplayed={'6'}
                                                            linkClassPrev="fa  fa-backward"
                                                            linkClassNext="fa  fa-forward"
                                                            prevPageText=""
                                                            nextPageText=""
                                                            hideFirstLastPages="false"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section End */}

            {/* Quick-view modal popup start*/}
            <ProductquickView modalproduct={modalproduct} quantity={quantity} addToCart={addToCart} />
            {/* Quick-view modal popup end*/}
        </>
    );
};

export default Products;
