import { Campaign, DashboardStats } from './types';

export const mockDashboardStats: DashboardStats = {
  campaigns: { total: 5, active: 1, paused: 4 },
  tasks: { pending: 150, active: 5, completed: 845, failed: 12 },
};

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Форум Amix 2026",
    status: 'active',
    stats: { total: 4, pending: 1, in_progress: 1, completed: 1, failed: 1 },
    details: {
        filename: "forum_amix_2026.xlsx",
        createdAt: "24.05.2026",
        lastStarted: "24.05.2026 10:30"
    },
    contacts: [
        { id: 10, name: "Артем", phone: "79650348852", company: "Студия мебели", attendanceStatus: 'attended', city: "Москва", context: "Пришел на форум" },
        { id: 11, name: "Иван", phone: "79991234567", company: "Дизайн бюро", attendanceStatus: 'not_attended', city: "СПб", context: "Заявка с сайта" }
    ],
    tasks: [
        { id: 25, contactId: 10, status: 'completed', lastStatus: 'Финализировано' },
        { id: 26, contactId: 11, status: 'in_progress', lastStatus: 'Разговор идет' }
    ],
    calls: [
        { id: 100, clientName: "Артем", status: 'finalized', duration: 185, summary: "Обсудили внедрение AI-ассистента.", outcome: "Заинтересован" }
    ]
  },
  {
    id: 2,
    name: "Осенний обзвон",
    status: 'paused',
    stats: { total: 500, pending: 500, in_progress: 0, completed: 0, failed: 0 },
    details: {
        filename: "q3_outreach.xlsx",
        createdAt: "20.05.2026",
        lastStarted: "Не запускалась",
    },
    contacts: [],
    tasks: [],
    calls: []
  },
];
