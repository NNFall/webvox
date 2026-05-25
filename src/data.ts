import { Campaign, DashboardStats } from './types';

export const mockDashboardStats: DashboardStats = {
  campaigns: { total: 2, active: 1, paused: 1 },
  tasks: { total: 504, pending: 500, active: 1, completed: 2, failed: 1 },
};

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Форум Amix 2026",
    status: 'active',
    sourceFilename: "forum_amix_2026.xlsx",
    callDelaySeconds: 30,
    stats: { total: 100, pending: 95, in_progress: 1, completed: 2, failed: 2 },
    details: { createdAt: "24.05.2026", lastStarted: "24.05.2026 10:30" },
    contacts: [
        { id: 10, name: "Артем", phone: "79650348852", company: "Студия мебели", attendanceStatus: 'attended', activityType: "Производство", isDecisionMaker: true, averageCheck: "150к", context: "Пришел на форум" },
        { id: 11, name: "Иван", phone: "79991234567", company: "Дизайн бюро", attendanceStatus: 'not_attended', activityType: "Дизайн", isDecisionMaker: false, averageCheck: "50к", context: "Заявка" }
    ],
    tasks: [
        { id: 25, contactId: 10, status: 'completed', lastStatus: 'Финализировано', lastError: null, attemptCount: 1 },
        { id: 26, contactId: 11, status: 'in_progress', lastStatus: 'Разговор идет', lastError: null, attemptCount: 1 }
    ],
    calls: [
        { id: 100, clientName: "Артем", status: 'finalized', duration: 185, summary: "Интересен AI-обзвон.", outcome: "Заинтересован", nextStep: "Передать менеджеру", recordingStatus: 'ready' }
    ],
    events: [
        { id: 1, stage: 'dial_start', status: 'started', message: 'Начало дозвона', createdAt: '10:30:00' },
        { id: 2, stage: 'call_connected', status: 'ok', message: 'Клиент поднял трубку', createdAt: '10:30:05' }
    ]
  },
  {
    id: 2,
    name: "Осенний обзвон",
    status: 'paused',
    sourceFilename: "q3_outreach.xlsx",
    callDelaySeconds: 60,
    stats: { total: 400, pending: 400, in_progress: 0, completed: 0, failed: 0 },
    details: { createdAt: "20.05.2026", lastStarted: null },
    contacts: [],
    tasks: [],
    calls: [],
    events: []
  },
];
