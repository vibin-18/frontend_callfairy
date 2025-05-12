import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    features: [
      '100 minutes of calls per month',
      'Basic voice agent features',
      'Email support',
      'Call recordings',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 99,
    features: [
      '500 minutes of calls per month',
      'Advanced voice agent features',
      'Priority support',
      'Call recordings & transcripts',
      'Custom voice options',
      'Analytics dashboard',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    features: [
      'Unlimited minutes',
      'All voice agent features',
      '24/7 dedicated support',
      'Call recordings & transcripts',
      'Custom voice options',
      'Advanced analytics',
      'API access',
      'Custom integrations',
    ],
  },
];

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [paymentHistory] = useState<PaymentHistory[]>([
    {
      id: '1',
      date: '2024-03-01',
      amount: 99,
      status: 'completed',
      description: 'Professional Plan - Monthly',
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 99,
      status: 'completed',
      description: 'Professional Plan - Monthly',
    },
    {
      id: '3',
      date: '2024-01-01',
      amount: 99,
      status: 'completed',
      description: 'Professional Plan - Monthly',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Billing & Subscription</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and view payment history
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
            <p className="mt-1 text-sm text-gray-500">
              You are currently on the Professional plan
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn-secondary">Change Plan</button>
            <button className="btn-primary">Upgrade</button>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white shadow rounded-lg p-6 ${
              plan.recommended ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            {plan.recommended && (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                Recommended
              </span>
            )}
            <h3 className="mt-4 text-lg font-medium text-gray-900">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${plan.price}
              <span className="text-base font-normal text-gray-500">/month</span>
            </p>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-500">{feature}</p>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full ${
                selectedPlan === plan.id ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Payment History</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {paymentHistory.map((payment) => (
              <li key={payment.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BanknotesIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Billing;

 