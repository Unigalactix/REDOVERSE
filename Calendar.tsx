import React from 'react';
import { phases, yearDuration } from './App';

interface CalendarProps {
    currentDay: number;
}

export const Calendar: React.FC<CalendarProps> = ({ currentDay }) => {
    
    const phaseClasses: Record<string, string> = {
        Purple: 'bg-purple-900/50 text-purple-200',
        Blue: 'bg-blue-900/50 text-blue-200',
        Red: 'bg-red-900/50 text-red-200',
    };

    const dayColorClasses: Record<string, string> = {
        Purple: 'bg-purple-950/60 hover:bg-purple-800/80',
        Blue: 'bg-blue-950/60 hover:bg-blue-800/80',
        Red: 'bg-red-950/60 hover:bg-red-800/80',
    };

    const allDays = Array.from({ length: yearDuration }, (_, i) => i + 1);
    let dayCounter = 0;
    const calendarDays = phases.map(phase => {
        const phaseDays = allDays.slice(dayCounter, dayCounter + phase.days);
        dayCounter += phase.days;
        return { ...phase, days: phaseDays };
    });

    const isDarknight = (day: number) => {
        const p4Days = phases.find(p => p.name.includes('P4'))?.days || 0;
        const lastThreeOfP4Start = yearDuration - 3;
        
        return (day >= 1 && day <= 3) || (day > lastThreeOfP4Start);
    };

    return (
        <div className="w-full text-white p-4">
            <h2 className="text-3xl font-bold text-gray-300 text-center mb-6">Zanian Year Cycle</h2>
            <div className="space-y-6">
                {calendarDays.map((phase) => (
                    <div key={phase.name} className={`rounded-lg p-4 border border-gray-700 ${phaseClasses[phase.color]}`}>
                        <h3 className="text-xl font-semibold mb-3">{phase.name} ({phase.days.length} days)</h3>
                        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 gap-1">
                            {phase.days.map((day) => {
                                const isCurrent = day === currentDay;
                                const isDN = isDarknight(day);
                                
                                let dayClass = isDN 
                                    ? 'bg-black hover:bg-gray-800' 
                                    : dayColorClasses[phase.color];
                                if (isCurrent) {
                                    dayClass += ' ring-2 ring-gray-300';
                                }

                                return (
                                    <div 
                                        key={day} 
                                        className={`w-10 h-10 flex items-center justify-center rounded-md text-xs font-mono transition-colors duration-200 ${dayClass}`}
                                        title={isDN ? `Day ${day} (Darknight)` : `Day ${day}`}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};