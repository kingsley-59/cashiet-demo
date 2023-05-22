import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
const SkeletonCart = () => {
   return (
      <div>
         <section className="cart-section section-b-space">
            <div className="col-sm-12 table-responsive-xs">
               <table className="table cart-table">
                  <tbody>
                      <tr>
                          <td>
                           <Skeleton height={100} count={1} width={110}></Skeleton>
                           </td>
                           <td>
                           <Skeleton height={10} count={1} width={80}></Skeleton>
                           </td>
                           <td>
                           <Skeleton height={20} count={1} width={110}></Skeleton>
                           </td>
                           <td>
                           <Skeleton height={40} count={1} width={80}></Skeleton>
                           </td>
                           <td>
                           <Skeleton height={20} count={1} width={20}></Skeleton>
                           </td>
                           <td>
                           <Skeleton height={30} count={1} width={150}></Skeleton>
                           </td>
                     </tr>
                  </tbody>
              </table>
            </div>
         </section>
      </div>
   )
}

export default SkeletonCart;