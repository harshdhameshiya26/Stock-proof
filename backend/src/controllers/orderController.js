//Handles order tracking/references during audit    

import { fetchOrdersByLocation } from "../services/orderService.js";

export const getActiveOrders = async (req, res, next) => {
  try {
    const { locationId } = req.query;
    const orders = await fetchOrdersByLocation(locationId);

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};