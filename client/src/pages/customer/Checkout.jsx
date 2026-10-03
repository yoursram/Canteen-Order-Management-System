import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CartContext } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatCurrency';
import { MapPin, CreditCard, CheckCircle2, User, AlertCircle, QrCode, Smartphone } from 'lucide-react';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, pickupLocation, setPickupLocation, subtotal, tax, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const pickupOptions = [
    'Main Canteen Counter',
    'Hostel Block A',
    'Hostel Block B'
  ];

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        pickup_location: pickupLocation,
        payment_method: paymentMethod,
        items: cartItems.map((i) => ({
          menu_item_id: i.id,
          quantity: i.quantity
        }))
      };

      const res = await orderService.createOrder(orderPayload);
      if (res.success) {
        setCreatedOrderId(res.data.order.id);
        clearCart();

        if (paymentMethod === 'UPI' || paymentMethod === 'CARD') {
          setShowDemoModal(true);
        } else {
          navigate(`/orders/${res.data.order.id}`);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !showDemoModal) {
    navigate('/menu');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-black text-gray-900 font-display">Checkout Order</h1>
        <p className="text-xs text-gray-500">Confirm student details, pickup location, and simulated payment</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          
          {/* Student Info Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900 font-display flex items-center space-x-2">
              <User className="w-4 h-4 text-orange-600" />
              <span>Student Information</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <span className="text-gray-400 block font-medium">Name:</span>
                <span className="font-bold text-gray-900">{user?.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Student ID:</span>
                <span className="font-bold text-gray-900">{user?.student_id || '22N31A6601'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Department & Year:</span>
                <span className="font-bold text-gray-900">{user?.department || 'AI & DS'} • {user?.year || '3rd Year'} ({user?.section || 'A'})</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Phone:</span>
                <span className="font-bold text-gray-900">{user?.phone}</span>
              </div>
            </div>
          </div>

          {/* Pickup Location Selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900 font-display flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Select Pickup Location</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pickupOptions.map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => setPickupLocation(location)}
                  className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                    pickupLocation === location
                      ? 'border-orange-500 bg-orange-50/50 text-orange-900 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-gray-400">Location</span>
                    {pickupLocation === location && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                  </div>
                  <span>{location}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900 font-display flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-orange-600" />
              <span>Select Payment Method (Simulated)</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'UPI', label: 'UPI Payment', desc: 'GooglePay / PhonePe' },
                { id: 'CARD', label: 'Credit/Debit Card', desc: 'Simulated Card' },
                { id: 'CASH', label: 'Cash on Pickup', desc: 'Pay at Counter' }
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                    paymentMethod === method.id
                      ? 'border-orange-500 bg-orange-50/50 text-orange-900 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{method.label}</span>
                    {paymentMethod === method.id && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                  </div>
                  <span className="text-[10px] text-gray-500 font-normal">{method.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Summary & Action */}
        <div className="space-y-4">
          <CartSummary subtotal={subtotal} tax={tax} total={total} isCheckoutPage={true} />

          <Button
            onClick={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
            variant="primary"
            className="w-full py-3.5 text-sm font-bold shadow-lg"
          >
            {loading ? 'Processing Order...' : `Confirm & Place Order (${formatCurrency(total)})`}
          </Button>
        </div>

      </div>

      {/* Demo Digital Payment Modal */}
      <Modal isOpen={showDemoModal} onClose={() => {}} title="Demo Payment Simulation">
        <div className="text-center space-y-4 py-3">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900 font-display">Demo Payment Successful!</h3>
          <p className="text-xs text-gray-500">
            Payment for Order <strong className="text-gray-800">#ORD{1000 + createdOrderId}</strong> was processed via simulated {paymentMethod}.
          </p>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs font-mono text-gray-700">
            Transaction ID: TXN-DEMO-{Date.now().toString().slice(-6)}
          </div>

          <Button
            onClick={() => {
              setShowDemoModal(false);
              navigate(`/orders/${createdOrderId}`);
            }}
            variant="primary"
            className="w-full py-2.5 font-bold"
          >
            View Live Order Status
          </Button>
        </div>
      </Modal>

    </div>
  );
};

export default Checkout;
