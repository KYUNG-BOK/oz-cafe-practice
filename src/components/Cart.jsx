import { useMenu } from "../context/menuContext";
import { useCart } from "../context/cartContext";
import data from "../assets/data";

function Cart() {
  const { menu } = useMenu();
  const { cart, setCart } = useCart();

  if (!menu)
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        메뉴 정보가 없어요!
      </div>
    );

  const allMenus = [...menu.커피, ...menu.논커피];

  const totalPrice = cart.reduce((acc, el) => {
    const menuItem = allMenus.find((menu) => menu.id === el.id);
    if (!menuItem) return acc;
    return acc + menuItem.price * el.quantity;
  }, 0);

  return (
    <>
      <h2>장바구니</h2>
      <ul className="cart">
        {cart.length ? (
          cart.map((el) => (
            <CartItem
              key={`${el.id}-${JSON.stringify(el.options)}`} 
              item={allMenus.find((menu) => menu.id === el.id)}
              options={el.options}
              quantity={el.quantity}
              cart={cart}
              setCart={setCart}
            />
          ))
        ) : (
          <div className="no-item">장바구니에 담긴 상품이 없어요!</div>
        )}
      </ul>
      {cart.length > 0 && (
        <div className="total-price">
          총 가격: <strong>{totalPrice.toLocaleString()}원</strong>
        </div>
      )}
    </>
  );
}

function CartItem({ item, options, quantity, cart, setCart }) {
  if (!item) return null;

  const totalPrice = item.price * quantity;

  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <img height={100} src={item.img} alt={item.name} />
        <div>{item.name}</div>
      </div>
      <div className="cart-item-option">
        {Object.keys(options).map((el) => (
          <div key={el}>
            {el} : {data.options[el][options[el]]}
          </div>
        ))}
        <div>개수 : {quantity}</div>
        <div>가격 : {totalPrice.toLocaleString()}원</div>
      </div>
      <button
        className="cart-item-delete"
        onClick={() => {
          setCart(
            cart.filter(
              (cartItem) =>
                !(
                  cartItem.id === item.id &&
                  JSON.stringify(cartItem.options) === JSON.stringify(options) &&
                  cartItem.quantity === quantity
                )
            )
          );
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default Cart;
