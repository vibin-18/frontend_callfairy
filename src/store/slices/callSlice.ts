import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Call {
  id: string;
  agentId: string;
  phoneNumber: string;
  duration: number;
  status: 'completed' | 'missed' | 'failed';
  recordingUrl?: string;
  transcript?: string;
  timestamp: string;
  cost: number;
}

interface CallAnalytics {
  totalCalls: number;
  averageDuration: number;
  successRate: number;
  totalCost: number;
}

interface CallState {
  calls: Call[];
  analytics: CallAnalytics;
  loading: boolean;
  error: string | null;
}

const initialState: CallState = {
  calls: [],
  analytics: {
    totalCalls: 0,
    averageDuration: 0,
    successRate: 0,
    totalCost: 0,
  },
  loading: false,
  error: null,
};

const callSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCalls: (state, action: PayloadAction<Call[]>) => {
      state.calls = action.payload;
    },
    addCall: (state, action: PayloadAction<Call>) => {
      state.calls.push(action.payload);
    },
    updateCall: (state, action: PayloadAction<Call>) => {
      const index = state.calls.findIndex(call => call.id === action.payload.id);
      if (index !== -1) {
        state.calls[index] = action.payload;
      }
    },
    setAnalytics: (state, action: PayloadAction<CallAnalytics>) => {
      state.analytics = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setCalls,
  addCall,
  updateCall,
  setAnalytics,
} = callSlice.actions;

export default callSlice.reducer; 