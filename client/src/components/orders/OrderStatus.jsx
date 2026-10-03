import React from 'react';
import { ORDER_STATUS_CONFIG } from '../../constants/orderStatus';

const OrderStatus = ({ status }) => {
  const config = ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG.PENDING;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${config.color}`}
    >
      {config.label}
    </span>
  );
};

export default OrderStatus;
