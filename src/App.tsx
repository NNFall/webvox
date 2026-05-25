/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockDashboardStats, mockCampaigns } from './data';
import { Campaign } from './types';
import { ArrowLeft, User, Phone, ClipboardList } from 'lucide-react';

export default function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Панель управления обзвоном</h1>
        <p className="text-zinc-400 mt-1">Центр оркестрации кампаний</p>
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
                  <motion.div
                    key={campaign.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedCampaign(campaign)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cursor-pointer bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between hover:border-zinc-600 transition-colors duration-300"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-white">{campaign.name}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <span className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-emerald-400' : 'bg-zinc-600'}`}></span>
                        <span className='text-xs font-mono uppercase text-zinc-400'>{campaign.status === 'active' ? 'Активна' : 'На паузе'}</span>
                      </div>
                    </div>
                    <div className="flex gap-10 text-sm font-mono text-zinc-300">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">Прогресс</p>
                        <p className="font-semibold text-white mt-1">{Math.round((campaign.stats.completed / campaign.stats.total) * 100)}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">Ошибки</p>
                        <p className="font-semibold text-rose-400 mt-1">{campaign.stats.failed}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <button onClick={() => setSelectedCampaign(null)} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} /> Назад к списку
            </button>
            <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl mb-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">{selectedCampaign.name}</h2>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors">Перезапустить</button>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase">Всего задач</p><p className="text-2xl font-bold text-white mt-1">{selectedCampaign.stats.total}</p></div>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase">В очереди</p><p className="text-2xl font-bold text-white mt-1">{selectedCampaign.stats.pending}</p></div>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase">Завершено</p><p className="text-2xl font-bold text-emerald-400 mt-1">{selectedCampaign.stats.completed}</p></div>
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800"><p className="text-xs text-zinc-500 uppercase">Ошибки</p><p className="text-2xl font-bold text-rose-400 mt-1">{selectedCampaign.stats.failed}</p></div>
                </div>
            </div>

            <section className='grid md:grid-cols-2 gap-6'>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <h3 className='text-lg font-medium text-white mb-4 flex items-center gap-2'><User size={20}/> Контакты</h3>
                    <div className='space-y-3'>
                        {selectedCampaign.contacts.map(c => (
                            <div key={c.id} className='bg-zinc-950 p-4 rounded-xl border border-zinc-800'>
                                <p className='font-semibold'>{c.name}</p>
                                <p className='text-sm text-zinc-400'>{c.phone} • {c.company}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <h3 className='text-lg font-medium text-white mb-4 flex items-center gap-2'><Phone size={20}/> Звонки</h3>
                     <div className='space-y-3'>
                        {selectedCampaign.calls.map(c => (
                            <div key={c.id} className='bg-zinc-950 p-4 rounded-xl border border-zinc-800'>
                                <p className='font-semibold'>{c.clientName} ({c.outcome})</p>
                                <p className='text-sm text-zinc-400'>{c.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
