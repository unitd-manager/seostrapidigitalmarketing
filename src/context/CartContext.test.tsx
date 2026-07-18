import { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CartProvider, useCart } from "./CartContext";

const samplePackage = {
  id: "starter",
  name: "Starter",
  price: 499,
  billing: "monthly" as const,
  priceId: "price_starter",
};

const CartHarness = () => {
  const { items, addToCart, cartCount, cartTotal } = useCart();

  return (
    <>
      <button onClick={() => addToCart(samplePackage)}>Add package</button>
      <div data-testid="item-count">{items.length}</div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
    </>
  );
};

const renderWithCart = (children: ReactNode) => {
  return render(<CartProvider>{children}</CartProvider>);
};

describe("CartProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("keeps a package unique when the same plan is added twice", () => {
    renderWithCart(<CartHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Add package" }));
    fireEvent.click(screen.getByRole("button", { name: "Add package" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("1");
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    expect(screen.getByTestId("cart-total")).toHaveTextContent("499");
  });
});