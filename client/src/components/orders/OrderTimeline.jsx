import React from 'react';
import { ORDER_STATUS_CONFIG, ORDER_STEPS } from '../../constants/orderStatus';
import { Check, Clock, Utensils, PackageCheck, AlertCircle } from 'lucide-react';

const OrderTimeline = ({ currentStatus }) => {
  if (currentStatus === 'CANCELLED') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3 text-red-700">
        <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
        <div>
          <h4 className="text-sm font-bold">This order was cancelled</h4>
          <p className="text-xs text-red-600">Contact canteen administration if you require further details.</p>
        </div>
      </div>
    );
  }

  const currentConfig = ORDER_STATUS_CONFIG[currentStatus] || ORDER_STATUS_CONFIG.PENDING;
  const currentStepIndex = currentConfig.stepIndex;

  const stepIcons = [
    <Clock className="w-4 h-4" />,
    <Check className="w-4 h-4" />,
    <Utensils className="w-4 h-4" />,
    <PackageCheck className="w-4 h-4" />,
    <Check className="w-4 h-4" />
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs my-4 space-y-6">
      <h4 className="text-sm font-bold text-gray-900 font-display">Live Order Status Progress</h4>

      <div className="relative flex items-center justify-between">
        
        {/* Background Connecting Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-100 z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-500 z-0 transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%`
          }}
        />

        {/* Step Milestones */}
        {ORDER_STEPS.map((stepKey, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const config = ORDER_STATUS_CONFIG[stepKey];

          return (
            <div key={stepKey} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-orange-100 scale-110' : ''}`}
              >
                {stepIcons[index]}
              </div>

              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-bold block ${
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {config.label}
                </span>
                {isCurrent && (
                  <span className="text-[10px] text-orange-600 font-semibold animate-pulse block">
                    Current Stage
                  </span>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default OrderTimeline;
