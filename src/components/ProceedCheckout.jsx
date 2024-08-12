import React from "react";

const ProceedCheckout = ({ cartItems }) => {
  const total =
    Math.round(
      cartItems.reduce((acc, curr) => {
        return (acc += curr.price * curr.quantity);
      }, 0) * 100
    ) / 100;

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log("time for implement bank process");
  };
  return (
    <div className="card-proceed">
      <form onSubmit={handleCheckout} className="proceed-form">
        <label htmlFor="promo">Promo Code</label>
        <div className="input-group">
          <input id="promo" type="text" placeholder="type promo code here" />
          <button className="promo-btn">Apply</button>
        </div>
        <hr />
        <table className="table-proceed">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>{total} $</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>0.0 $</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{total} $</td>
            </tr>
          </tbody>
        </table>
        <button className="proceed-btn" type="submit">
          Proceed To Checkout
        </button>
      </form>
    </div>
  );
};

export default ProceedCheckout;
