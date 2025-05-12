import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setCalls } from '../../store/slices/callSlice';
import { PhoneIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Call {
  id: string;
  phoneNumber: string;
  status: 'completed' | 'missed' | 'failed';
  timestamp: string;
  duration: number;
  recordingUrl?: string;
  transcript?: string;
  agentId: string;
}

interface VoiceAgent {
  id: string;
  name: string;
}

interface CallFilters {
  status: string;
  dateRange: string;
  agentId: string;
}

const CallManagement = () => {
  const dispatch = useDispatch();
  const { calls } = useSelector((state: RootState) => state.calls) as { calls: Call[] };
  const { agents } = useSelector((state: RootState) => state.voiceAgent) as { agents: VoiceAgent[] };
  const [filters, setFilters] = useState<CallFilters>({
    status: 'all',
    dateRange: '7d',
    agentId: 'all',
  });

  const handleFilterChange = (key: keyof CallFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredCalls = calls.filter((call: Call) => {
    if (filters.status !== 'all' && call.status !== filters.status) return false;
    if (filters.agentId !== 'all' && call.agentId !== filters.agentId) return false;
    // TODO: Implement date range filtering
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Call Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your voice agent calls
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input-field mt-1"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select
              id="dateRange"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="input-field mt-1"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label htmlFor="agentId" className="block text-sm font-medium text-gray-700">
              Voice Agent
            </label>
            <select
              id="agentId"
              value={filters.agentId}
              onChange={(e) => handleFilterChange('agentId', e.target.value)}
              className="input-field mt-1"
            >
              <option value="all">All Agents</option>
              {agents.map((agent: VoiceAgent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Call List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Call History</h3>
        </div>
        <div className="border-t border-gray-200">
          {filteredCalls.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredCalls.map((call: Call) => (
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
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <CalendarIcon className="mr-1.5 h-4 w-4" />
                          {new Date(call.timestamp).toLocaleDateString()}
                          <ClockIcon className="ml-3 mr-1.5 h-4 w-4" />
                          {Math.floor(call.duration / 60)}m {call.duration % 60}s
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {call.recordingUrl && (
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-900"
                          onClick={() => window.open(call.recordingUrl, '_blank')}
                        >
                          Listen
                        </button>
                      )}
                      {call.transcript && (
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-900"
                          onClick={() => window.open(call.transcript, '_blank')}
                        >
                          Transcript
                        </button>
                      )}
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
              No calls found matching the current filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallManagement; 