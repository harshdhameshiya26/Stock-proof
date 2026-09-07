// Shop — stores Shopify access tokens and per-shop configuration

import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
    /** e.g. "my-store.myshopify.com" */
    shopifyDomain: {
      type: String,
      required: [true, 'shopifyDomain is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    /** Shopify OAuth access token — keep encrypted at rest in production */
    accessToken: {
      type: String,
      required: [true, 'accessToken is required'],
    },
    /** The Shopify Admin API version this shop's token was issued against */
    apiVersion: {
      type: String,
      default: '2024-10',
    },
    /** HMAC secret for verifying Shopify webhook payloads */
    webhookSecret: {
      type: String,
      default: null,
    },
    /** Whether the app is currently installed and active in this store */
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    /** Shopify plan name (e.g. "Basic", "Shopify", "Advanced") */
    shopifyPlan: {
      type: String,
      default: null,
    },
    /** Shop owner email from Shopify */
    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    /** Display name from Shopify shop object */
    name: {
      type: String,
      default: null,
    },
    /** Timestamp when the app was first installed */
    installedAt: {
      type: Date,
      default: Date.now,
    },
    /** Timestamp when the app was uninstalled (null if active) */
    uninstalledAt: {
      type: Date,
      default: null,
    },
    /** Currency code for this store */
    currency: {
      type: String,
      default: null,
      uppercase: true,
      maxlength: 3,
    },
    /** IANA timezone string */
    timezone: {
      type: String,
      default: null,
    },

    // ── Billing / Subscription ────────────────────────────────────────────────
    /**
     * Active plan key. Matches a key in billingPlans.js.
     * null = no plan selected yet (unsubscribed)
     */
    billingPlan: {
      type: String,
      enum: ['starter', 'pro', null],
      default: null,
    },
    /**
     * Shopify recurring charge status:
     *   pending   — charge created, awaiting merchant approval
     *   active    — merchant approved, subscription live
     *   declined  — merchant declined the charge
     *   expired   — approval link expired (48 h window)
     *   cancelled — merchant cancelled from Shopify billing settings
     *   frozen    — subscription paused due to payment failure
     */
    billingStatus: {
      type: String,
      enum: ['pending', 'active', 'declined', 'expired', 'cancelled', 'frozen', null],
      default: null,
    },
    /** Shopify recurring_application_charge ID — used to verify & cancel */
    chargeId: {
      type: String,
      default: null,
    },
    /** ISO date when the trial period ends (null = no trial / trial over) */
    trialEndsAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'tbl_Shop',
  }
);

// ── Instance helper: build Shopify Admin API base URL ──────────────────────────
shopSchema.methods.adminApiUrl = function (version) {
  const v = version || this.apiVersion;
  return `https://${this.shopifyDomain}/admin/api/${v}`;
};

export default mongoose.models.Shop || mongoose.model('Shop', shopSchema);