export type PaymentProvider = "razorpay";

export type PaymentItem = {
  id?: string | null;
  name?: string | null;
};

export const DEFAULT_PAYMENT_PROVIDER: PaymentProvider = "razorpay";

export const normalizePaymentKey = (value?: string | null) =>
  (value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-\d+$/, "");

export const getPaymentProvider = (_provider?: string | null): PaymentProvider => {
  return DEFAULT_PAYMENT_PROVIDER;
};

export const getPaymentProviderName = (provider: PaymentProvider) => {
  if (provider === "razorpay") {
    return "Razorpay";
  }

  return "Payment";
};

export const getPaymentItemKey = (item?: PaymentItem | null) => {
  return normalizePaymentKey(item?.id) || normalizePaymentKey(item?.name);
};

export const getPaymentButtonLabel = (
  provider: PaymentProvider,
  amount: number,
  currency = "USD",
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return `Pay ${formatter.format(amount)} with ${getPaymentProviderName(provider)}`;
};
