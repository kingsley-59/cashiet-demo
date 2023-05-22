const OrderItem = ({order}) => {
    return (
        <div class="card">
            <div class="card-header">
                {order.orderDate}
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}

export default OrderItem;