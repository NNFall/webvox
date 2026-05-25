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
        { id: 10, name: "Артем", phone: "79650348852", company: "Студия мебели", attendanceStatus: 'attended', city: "Москва", activityType: "Производство", isDecisionMaker: true, averageCheck: "150к", context: "Пришел на форум" },
        { id: 11, name: "Иван", phone: "79991234567", company: "Дизайн бюро", attendanceStatus: 'not_attended', city: "СПб", activityType: "Дизайн", isDecisionMaker: false, averageCheck: "50к", context: "Заявка" },
        { id: 12, name: "Мария", phone: "79161234567", company: "Агентство недвижимости", attendanceStatus: 'attended', city: "Казань", activityType: "Риелторские услуги", isDecisionMaker: true, averageCheck: "300к", context: "Спикер" },
        { id: 13, name: "Олег", phone: "79039876543", company: "IT-стартап", attendanceStatus: 'attended', city: "Екатеринбург", activityType: "Разработка ПО", isDecisionMaker: true, averageCheck: "100к", context: "Участник" },
        { id: 14, name: "Анна", phone: "79261112233", company: "Салон красоты", attendanceStatus: 'not_attended', city: "Сочи", activityType: "Бьюти", isDecisionMaker: false, averageCheck: "20к", context: "Интересовалась CRM" }
    ],
    tasks: [
        { id: 25, contactId: 10, status: 'completed', lastStatus: 'Финализировано', lastError: null, attemptCount: 1 },
        { id: 26, contactId: 11, status: 'completed', lastStatus: 'Финализировано', lastError: null, attemptCount: 1 },
        { id: 27, contactId: 12, status: 'failed', lastStatus: 'Автоответчик', lastError: 'voicemail_detected', attemptCount: 2 },
        { id: 28, contactId: 13, status: 'in_progress', lastStatus: 'Разговор идет', lastError: null, attemptCount: 1 },
        { id: 29, contactId: 14, status: 'pending', lastStatus: 'Ожидает', lastError: null, attemptCount: 0 }
    ],
    calls: [
        { id: 100, contactId: 10, clientName: "Артем", status: 'finalized', duration: 185, summary: "Интересен AI-обзвон.", outcome: "Заинтересован", nextStep: "Передать менеджеру", recordingStatus: 'ready', transcript: [
            { speaker: 'robot', text: 'Здравствуйте, Артем! Я звоню вам по поводу форума Amix 2026. Вы были на мероприятии, верно?', time: '0:01' },
            { speaker: 'client', text: 'Алло. Да, был.', time: '0:08' },
            { speaker: 'robot', text: 'Здорово! Наша компания предоставляет услуги AI-обзвона. У вас в студии была бы интересна автоматизация работы с клиентами?', time: '0:12' },
            { speaker: 'client', text: 'Ну, вообще мы сейчас рассматриваем такие штуки. А сколько это стоит?', time: '0:25' },
            { speaker: 'robot', text: 'Стоимость зависит от объема базы. В среднем, тарифы начинаются от 5 000 рублей в месяц. Давайте я передам ваш контакт нашему менеджеру, он перезвонит и всё детально расскажет?', time: '0:35' },
            { speaker: 'client', text: 'Давайте. Сегодня после двух могу говорить.', time: '0:50' },
            { speaker: 'robot', text: 'Отлично, записала. Менеджер свяжется с вами сегодня после 14:00. Хорошего дня!', time: '0:55' },
            { speaker: 'client', text: 'До свидания.', time: '1:02' }
        ] },
        { id: 101, contactId: 11, clientName: "Иван", status: 'finalized', duration: 15, summary: "Отказ от разговора, сослался на занятость.", outcome: "Отказ", nextStep: "Отправить email с презентацией", recordingStatus: 'ready', transcript: [
            { speaker: 'robot', text: 'Здравствуйте, Иван! Я звоню от лица организаторов форума Amix 2026. Удобно говорить?', time: '0:01' },
            { speaker: 'client', text: 'Нет, сейчас вообще не до этого. До свидания.', time: '0:08' },
            { speaker: 'robot', text: 'Поняла вас. Отправим материалы вам на почту. Хорошего дня!', time: '0:12' }
        ] },
        { id: 102, contactId: 12, clientName: "Мария", status: 'finalized', duration: 8, summary: "Попадание на автоответчик.", outcome: "Недозвон", nextStep: "Перезвонить через 2 часа", recordingStatus: 'error', transcript: [
            { speaker: 'robot', text: 'Алло, Мария?', time: '0:01' },
            { speaker: 'client', text: 'Абонент временно недоступен. Попробуйте позвонить позднее.', time: '0:05' }
        ] }
    ],
    events: [
        { id: 1, stage: 'dial_start', status: 'started', message: 'Начало дозвона (Артем)', createdAt: '10:30:00' },
        { id: 2, stage: 'call_connected', status: 'ok', message: 'Клиент поднял трубку (Артем)', createdAt: '10:30:05' },
        { id: 3, stage: 'call_finished', status: 'ok', message: 'Звонок завершен (Артем)', createdAt: '10:33:10' },
        { id: 4, stage: 'dial_start', status: 'started', message: 'Начало дозвона (Иван)', createdAt: '10:35:00' },
        { id: 5, stage: 'call_connected', status: 'ok', message: 'Клиент поднял трубку (Иван)', createdAt: '10:35:08' },
        { id: 6, stage: 'call_finished', status: 'ok', message: 'Звонок завершен (Иван)', createdAt: '10:35:23' },
        { id: 7, stage: 'dial_start', status: 'started', message: 'Начало дозвона (Мария)', createdAt: '10:40:00' },
        { id: 8, stage: 'error', status: 'error', message: 'Автоответчик (Мария)', createdAt: '10:40:15' }
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
