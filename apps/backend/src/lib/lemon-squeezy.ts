/**
 * Check if the value is an object.
 */
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Typeguard to check if the object has a 'meta' property
 * and that the 'meta' property has the correct shape.
 */
export function webhookHasMeta(obj: unknown): obj is {
  meta: {
    event_name: string;
    custom_data: {
      organization_id: string;
    };
  };
} {
  if (
    isObject(obj) &&
    isObject(obj.meta) &&
    typeof obj.meta.event_name === "string" &&
    isObject(obj.meta.custom_data) &&
    typeof obj.meta.custom_data.organization_id === "string"
  ) {
    return true;
  }
  return false;
}

export function webhookHasSubscriptionPaymentData(obj: unknown): obj is {
  data: {
    attributes: Record<string, unknown> & {
      urls: {
        invoice_url: string;
      };
    };
  };
} {
  return (
    isObject(obj) &&
    "data" in obj &&
    isObject(obj.data) &&
    "attributes" in obj.data &&
    isObject(obj.data.attributes) &&
    "urls" in obj.data.attributes &&
    isObject(obj.data.attributes.urls) &&
    "invoice_url" in obj.data.attributes.urls &&
    typeof obj.data.attributes.urls.invoice_url === "string"
  );
}

/**
 * Typeguard to check if the object has a 'data' property and the correct shape.
 *
 * @param obj - The object to check.
 * @returns True if the object has a 'data' property.
 */
export function webhookHasSubscriptionData(obj: unknown): obj is {
  data: {
    attributes: Record<string, unknown> & {
      first_subscription_item: {
        id: number;
        price_id: number;
        is_usage_based: boolean;
      };
    };
    id: string;
  };
} {
  return (
    isObject(obj) &&
    "data" in obj &&
    isObject(obj.data) &&
    "attributes" in obj.data &&
    isObject(obj.data.attributes) &&
    "first_subscription_item" in obj.data.attributes &&
    isObject(obj.data.attributes.first_subscription_item)
  );
}

/**
 * Ensures that required environment variables are set and sets up the Lemon
 * Squeezy JS SDK. Throws an error if any environment variables are missing or
 * if there's an error setting up the SDK.
 */
export function configureLemonSqueezy(): void {
  const requiredVars = [
    "BACKEND_LEMONSQUEEZY_WEBHOOK_SECRET",
    "BACKEND_LEMONSQUEEZY_API_KEY",
    "BACKEND_LEMONSQUEEZY_STORE_ID",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required LEMONSQUEEZY env variables: ${missingVars.join(
        ", ",
      )}. Please, set them in your .env file.`,
    );
  }

  lemonSqueezySetup({
    apiKey: process.env.BACKEND_LEMONSQUEEZY_API_KEY,
    onError: (error) => {
      // eslint-disable-next-line no-console -- allow logging
      console.error(error);
      throw new Error(`Lemon Squeezy API error: ${error.message}`);
    },
  });
}
