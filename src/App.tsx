import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockDashboardStats, mockCampaigns } from './data';
import { Campaign, Call } from './types';
import { ArrowLeft, User, Phone, ClipboardList, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'tasks' | 'calls' | 'events'>('contacts');

  const tabs = [
    { id: 'contacts', name: 'Контакты', icon: User },
    { id: 'tasks', name: 'Задачи', icon: ClipboardList },
    { id: 'calls', name: 'Звонки', icon: Phone },
    { id: 'events', name: 'События', icon: Clock },
  ] as const;

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setSelectedCall(null);
  };

  const resetSelection = () => {
    setSelectedCampaign(null);
    setSelectedCall(null);
    setActiveTab('contacts');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Панель управления обзвоном</h1>
        <p className="text-zinc-400 mt-1">Детальный мониторинг и оркестрация</p>
      </header>
      
      <AnimatePresence mode="wait">
        {!selectedCampaign ? (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <p className="text-sm text-zinc-400">Всего кампаний</p>
                <p className="text-3xl font-bold text-white mt-1">{mockDashboardStats.campaigns.total}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <p className="text-sm text-zinc-400">Активные задачи</p>
                <p className="text-3xl font-bold text-white mt-1">{mockDashboardStats.tasks.active}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <p className="text-sm text-zinc-400">Завершено</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">{mockDashboardStats.tasks.completed}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <p className="text-sm text-zinc-400">Ошибки</p>
                <p className="text-3xl font-bold text-rose-400 mt-1">{mockDashboardStats.tasks.failed}</p>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-medium text-white mb-6">Кампании</h2>
              <div className="grid gap-3">
                {mockCampaigns.map((campaign) => (
                  <motion.div key={campaign.id} whileHover={{ x: 4 }} onClick={() => setSelectedCampaign(campaign)} className="cursor-pointer bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between hover:border-zinc-600 transition-colors">
                    <div>
                      <h3 className="text-lg font-medium text-white">{campaign.name}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <span className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-emerald-400' : 'bg-zinc-600'}`}></span>
                        <span className='text-xs font-mono uppercase text-zinc-400'>{campaign.status === 'active' ? 'Активна' : 'На паузе'}</span>
                      </div>
                    </div>
                    <div className="flex gap-10 text-sm font-mono text-zinc-300">
                      <div><p className="text-xs text-zinc-500 uppercase">Прогресс</p><p className="font-semibold text-white mt-1">{Math.round((campaign.stats.completed / campaign.stats.total) * 100)}%</p></div>
                      <div><p className="text-xs text-zinc-500 uppercase">Ошибки</p><p className="font-semibold text-rose-400 mt-1">{campaign.stats.failed}</p></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <button onClick={() => { setSelectedCampaign(null); setActiveTab('contacts'); }} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} /> Назад
            </button>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedCampaign.name}</h2>
                        <p className='text-zinc-400'>Файл базы: {selectedCampaign.sourceFilename}</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors">Приостановить</button>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-10'>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase tracking-wider">Всего задач</p><p className="text-2xl font-bold text-white mt-1">{selectedCampaign.stats.total}</p></div>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase tracking-wider">В очереди</p><p className="text-2xl font-bold text-white mt-1">{selectedCampaign.stats.pending}</p></div>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase tracking-wider">Завершено</p><p className="text-2xl font-bold text-emerald-400 mt-1">{selectedCampaign.stats.completed}</p></div>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase tracking-wider">Ошибки</p><p className="text-2xl font-bold text-rose-400 mt-1">{selectedCampaign.stats.failed}</p></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-300'>
                    <div className='bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-2'>
                      <p>Файл базы: <span className='text-white font-medium'>{selectedCampaign.sourceFilename}</span></p>
                      <p>Дата создания: <span className='text-white font-medium'>{selectedCampaign.details.createdAt}</span></p>
                    </div>
                    <div className='bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-2'>
                        <p>Статус: <span className={`font-bold ${selectedCampaign.status === 'active' ? 'text-emerald-400' : 'text-zinc-600'}`}>{selectedCampaign.status === 'active' ? 'Активна' : 'На паузе'}</span></p>
                        <p>Последний запуск: <span className='text-white font-medium'>{selectedCampaign.details.lastStarted || 'Не запускалась'}</span></p>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="flex border-b border-zinc-800">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`px-8 py-5 flex items-center gap-2.5 font-medium ${activeTab === tab.id ? 'border-b-2 border-emerald-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            <tab.icon size={20}/> {tab.name}
                        </button>
                    ))}
                </div>
                <div className='p-8'>
                    {activeTab === 'contacts' && (
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-5 text-xs text-zinc-500 uppercase px-4 py-2 border-b border-zinc-800'>
                                <span>Имя</span><span>Телефон</span><span>Компания</span><span>Статус</span><span>Город</span>
                            </div>
                            {selectedCampaign.contacts.map(c => (
                                <div key={c.id} className='grid grid-cols-5 gap-2 px-4 py-4 hover:bg-zinc-800 rounded-lg items-center text-sm'>
                                    <span className='font-semibold'>{c.name}</span>
                                    <span className='font-mono text-zinc-400'>{c.phone}</span>
                                    <span>{c.company}</span>
                                    <span className={`px-2 py-0.5 rounded text-xs ${c.attendanceStatus === 'attended' ? 'bg-emerald-950 text-emerald-300' : 'bg-zinc-700 text-zinc-400'}`}>{c.attendanceStatus === 'attended' ? 'Был' : 'Не был'}</span>
                                    <span className='text-zinc-400'>{c.city}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'tasks' && (
                        <div className='flex flex-col gap-2'>
                             <div className='grid grid-cols-4 text-xs text-zinc-500 uppercase px-4 py-2 border-b border-zinc-800'>
                                <span>ID задачи</span><span>Статус</span><span>Попытки</span><span>Последний статус</span>
                            </div>
                             {selectedCampaign.tasks.map(t => (
                                <div key={t.id} className='grid grid-cols-4 gap-2 px-4 py-4 hover:bg-zinc-800 rounded-lg items-center text-sm font-mono'>
                                    <span>{t.id}</span>
                                    <span className={t.status === 'completed' ? 'text-emerald-400' : 'text-zinc-400'}>{t.status}</span>
                                    <span>{t.attemptCount}</span>
                                    <span>{t.lastStatus}</span>
                                </div>
                            ))}
                        </div>
                    )}
                     {activeTab === 'calls' && (
                        !selectedCall ? (
                            <div className='space-y-2'>
                                <div className='grid grid-cols-4 text-xs text-zinc-500 uppercase px-4 py-2 border-b border-zinc-800'>
                                    <span>Клиент</span><span>Итог</span><span>Длительность</span><span>Саммари</span>
                                </div>
                                {selectedCampaign.calls.map(c => (
                                    <div key={c.id} onClick={() => setSelectedCall(c)} className='grid grid-cols-4 gap-2 cursor-pointer px-4 py-4 hover:bg-zinc-800 rounded-lg items-center text-sm'>
                                        <span className='font-semibold'>{c.clientName}</span>
                                        <span className='text-emerald-400 font-mono'>{c.outcome}</span>
                                        <span className='text-zinc-400'>{c.duration} сек</span>
                                        <span className='text-sm text-zinc-400 truncate'>{c.summary}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='bg-zinc-950 p-6 rounded-xl border border-zinc-800'>
                                <button onClick={() => setSelectedCall(null)} className='flex items-center gap-1 text-xs text-zinc-500 hover:text-white mb-4'><ArrowLeft size={14}/> Назад к звонкам</button>
                                <h3 className='text-xl font-bold mb-6'>{selectedCall.clientName}</h3>
                                <div className='grid grid-cols-2 gap-4 text-sm'>
                                    <p className='text-zinc-500'>Итог: <span className='text-white ml-2'>{selectedCall.outcome}</span></p>
                                    <p className='text-zinc-500'>Длительность: <span className='text-white ml-2'>{selectedCall.duration} сек.</span></p>
                                    <p className='text-zinc-500'>Следующий шаг: <span className='text-white ml-2'>{selectedCall.nextStep}</span></p>
                                    <p className='text-zinc-500'>Запись: <span className='text-emerald-400 ml-2'>{selectedCall.recordingStatus === 'ready' ? 'Доступна' : 'Готовится'}</span></p>
                                </div>
                                <div className='mt-6 p-4 bg-zinc-900 rounded-lg'>
                                    <p className='text-xs text-zinc-500 uppercase mb-2'>Саммари</p>
                                    <p className='text-sm text-zinc-300'>{selectedCall.summary}</p>
                                </div>
                            </div>
                        )
                    )}
                    {activeTab === 'events' && (
                         <div className='space-y-2'>
                            {selectedCampaign.events.map(e => (
                                <div key={e.id} className='flex gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        {e.status === 'ok' ? <CheckCircle className='text-emerald-500' size={18}/> : <AlertCircle className='text-rose-500' size={18}/>}
                                        <p className='font-mono text-sm text-zinc-300'>{e.message}</p>
                                    </div>
                                    <p className='text-xs text-zinc-500 font-mono'>{e.createdAt}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
