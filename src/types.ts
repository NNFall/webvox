export interface Contact {
  id: number;
  name: string;
  phone: string;
  company: string;
  attendanceStatus: 'attended' | 'not_attended';
  city: string;
  context: string;
}

export interface OutboundTask {
  id: number;
  contactId: number;
  status: 'pending' | 'started' | 'in_progress' | 'completed' | 'failed';
  lastStatus: string;
}

export interface Call {
  id: number;
  clientName: string;
  status: string;
  duration: number; // in seconds
  summary: string;
  outcome: string;
}

export interface Campaign {
  id: number;
  name: string;
  status: 'paused' | 'active';
  stats: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    failed: number;
  };
  details: {
    filename: string;
    createdAt: string;
    lastStarted: string;
  };
  contacts: Contact[];
  tasks: OutboundTask[];
  calls: Call[];
}

export interface DashboardStats {
  campaigns: { total: number; active: number; paused: number };
  tasks: { pending: number; active: number; completed: number; failed: number };
}
