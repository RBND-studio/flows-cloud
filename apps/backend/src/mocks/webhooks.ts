export const mockWebhooks = {
  subscription_created: {
    data: {
      id: "324441",
      type: "subscriptions",
      attributes: {
        pause: null,
        status: "active",
        ends_at: null,
        order_id: 2400103,
        store_id: 60146,
        cancelled: false,
        renews_at: "2024-05-01T08:42:23.000000Z",
        test_mode: true,
        user_name: "John Doe",
        card_brand: "visa",
        created_at: "2024-04-01T08:42:24.000000Z",
        product_id: 209148,
        updated_at: "2024-04-01T08:42:27.000000Z",
        user_email: "vojtechvidra@gmail.com",
        variant_id: 323122,
        customer_id: 2460278,
        product_name: "Flows Subscription",
        variant_name: "Default",
        order_item_id: 2360867,
        trial_ends_at: null,
        billing_anchor: 1,
        card_last_four: "4242",
        status_formatted: "Active",
        first_subscription_item: {
          id: 269684,
          price_id: 454158,
          quantity: 0,
          created_at: "2024-04-01T08:42:27.000000Z",
          updated_at: "2024-04-01T08:42:27.000000Z",
          is_usage_based: true,
          subscription_id: 324441,
        },
      },
    },
    meta: {
      test_mode: true,
      event_name: "subscription_created",
      webhook_id: "bd96ee56-7277-4bd5-9613-59f33560660a",
      custom_data: {
        organization_id: "ebcf453e-a121-4784-89b1-0181721edfa0",
      },
    },
  },
  subscription_payment_success: {
    data: {
      id: "815035",
      type: "subscription-invoices",
      attributes: {
        tax: 0,
        urls: {
          invoice_url:
            "https://app.lemonsqueezy.com/my-orders/f3dd55b0-8917-4164-8f14-0a2385b1aa5c/subscription-invoice/815035?signature=f23934aecdce1a21e3d2402a093f598f05391af9606a5f5e8c751237ee97ecf4",
        },
        total: 0,
        status: "paid",
        tax_usd: 0,
        currency: "USD",
        refunded: false,
        store_id: 60146,
        subtotal: 0,
        test_mode: true,
        total_usd: 0,
        user_name: "John Doe",
        card_brand: null,
        created_at: "2024-04-01T08:42:25.000000Z",
        updated_at: "2024-04-01T08:42:55.000000Z",
        user_email: "vojtechvidra@gmail.com",
        customer_id: 2460278,
        refunded_at: null,
        subtotal_usd: 0,
        currency_rate: "1.00000000",
        tax_formatted: "$0.00",
        tax_inclusive: false,
        billing_reason: "initial",
        card_last_four: null,
        discount_total: 0,
        subscription_id: 324441,
        total_formatted: "$0.00",
        status_formatted: "Paid",
        discount_total_usd: 0,
        subtotal_formatted: "$0.00",
        discount_total_formatted: "$0.00",
      },
    },
    meta: {
      test_mode: true,
      event_name: "subscription_payment_success",
      webhook_id: "b4a177a1-4190-497d-b43d-59f84de3f32f",
      custom_data: {
        organization_id: "ebcf453e-a121-4784-89b1-0181721edfa0",
      },
    },
  },
};