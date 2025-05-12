import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setCalls, setAnalytics } from '../../store/slices/callSlice';
import {
  PhoneIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Calls',
    value: '0',
    icon: PhoneIcon,
    change: '+4.75%',
    changeType: 'positive',
  },
  {
    name: 'Average Duration',
    value: '0m',
    icon: ClockIcon,
    change: '+54.02%',
    changeType: 'positive',
  },
  {
    name: 'Total Cost',
    value: '$0.00',
    icon: CurrencyDollarIcon,
    change: '-1.39%',
    changeType: 'negative',
  },
  {
    name: 'Success Rate',
    value: '0%',
    icon: ChartBarIcon,
    change: '+10.18%',
    changeType: 'positive',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { calls, analytics } = useSelector((state: RootState) => state.calls) as {
    calls: any[];
    analytics: any;
  };

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchDashboardData = async () => {
      try {
        const [callsResponse, analyticsResponse] = await Promise.all([
          fetch('/api/calls'),
          fetch('/api/analytics'),
        ]);

        if (callsResponse.ok && analyticsResponse.ok) {
          const callsData = await callsResponse.json();
          const analyticsData = await analyticsResponse.json();
          dispatch(setCalls(callsData));
          dispatch(setAnalytics(analyticsData));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your voice agent's performance and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
        </div>
        <div className="border-t border-gray-200">
          {calls.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {calls.map((call: any) => (
                <li key={call.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Call to {call.phoneNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(call.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          call.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : call.status === 'missed'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {call.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 sm:px-6 text-center text-gray-500">
              No recent calls to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 