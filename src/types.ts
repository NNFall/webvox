export interface Contact {
  id: number;
  phone: string;
  name: string;
  company: string;
  attendanceStatus: 'attended' | 'not_attended';
  activityType: string;
  isDecisionMaker: boolean;
  averageCheck: string;
  context: string;
}

export interface OutboundTask {
  id: number;
  contactId: number;
  status: 'pending' | 'starting' | 'started' | 'in_progress' | 'completed' | 'failed';
  lastStatus: string;
  lastError: string | null;
  attemptCount: number;
}

export interface Call {
  id: number;
  clientName: string;
  status: string;
  duration: number; // in seconds
  summary: string;
  outcome: string;
  nextStep: string;
  recordingStatus: 'ready' | 'preparing' | 'error';
}

export interface OutboundEvent {
  id: number;
  stage: string;
  status: 'ok' | 'error' | 'started';
  message: string;
  createdAt: string;
}

export interface Campaign {
  id: number;
  name: string;
  status: 'paused' | 'active';
  sourceFilename: string;
  callDelaySeconds: number;
  stats: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    failed: number;
  };
  details: {
    createdAt: string;
    lastStarted: string | null;
  };
  contacts: Contact[];
  tasks: OutboundTask[];
  calls: Call[];
  events: OutboundEvent[];
}

export interface DashboardStats {
  campaigns: { total: number; active: number; paused: number };
  tasks: { total: number; pending: number; active: number; completed: number; failed: number };
}
