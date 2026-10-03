export const ORDER_STATUS_CONFIG = {
  PENDING: {
    label: 'Order Placed',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    stepIndex: 0,
    description: 'Order received by canteen'
  },
  CONFIRMED: {
    label: 'Confirmed',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    stepIndex: 1,
    description: 'Canteen accepted your order'
  },
  PREPARING: {
    label: 'Preparing',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    stepIndex: 2,
    description: 'Chef is cooking your food'
  },
  READY: {
    label: 'Ready for Pickup',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    stepIndex: 3,
    description: 'Food is ready at counter'
  },
  COMPLETED: {
    label: 'Completed',
    color: 'bg-green-100 text-green-800 border-green-300',
    stepIndex: 4,
    description: 'Order collected'
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800 border-red-300',
    stepIndex: -1,
    description: 'Order cancelled'
  }
};

export const ORDER_STEPS = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED'];
