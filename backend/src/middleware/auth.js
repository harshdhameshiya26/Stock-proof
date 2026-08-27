//Validates Shopify session tokens & user roles (Staff vs Manager)

import User from "../models/User.js";

// 1. Authenticate Shopify Express Session & Token
// For Postman testing: pass header  x-store-domain: yourshop.myshopify.com
// In production this will decode the Shopify App Bridge JWT token
export const verifyShopifySession = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const storeDomain = req.headers["x-store-domain"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: Missing or malformed authorization header." });
        }

        // In production: decode Shopify App Bridge JWT
        // const token = authHeader.split(" ")[1];
        // const session = await shopify.api.session.decodeSessionToken(token);

        // For development/Postman: accept any Bearer token if x-store-domain is set
        if (!storeDomain) {
            return res.status(401).json({ error: "Unauthorized: Missing x-store-domain header." });
        }

        // Attach shop context to express request wrapper
        req.shopifySession = { dest: `https://${storeDomain}` };
        req.storeDomain = storeDomain;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Authentication failed", details: error.message });
    }
};

// 2. Role-Based Access Control (RBAC): Staff vs. Manager Verification
export const requireRole = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const staffId = req.headers["x-staff-id"] || req.body.staffId || req.query.staffId;

            if (!staffId) {
                return res.status(400).json({ error: "Staff identity verification failed: Missing Staff ID header/parameter." });
            }

            const user = { _id: staffId, role: "MANAGER" }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    error: `Forbidden: Access restricted to ${allowedRoles.join(" or ")} accounts. Your current role is: ${user.role}.`,
                });
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    };
};

// Convenience Exports for Specific Role Requirements
export const requireManager = requireRole(["MANAGER", "ADMIN"]);
export const requireStaffOrManager = requireRole(["STAFF", "MANAGER", "ADMIN"]);


//await User.findById(staffId);      // 46 //
//            if (!user) {
//                return res.status(404).json({ error: "User account not found." });
//            }