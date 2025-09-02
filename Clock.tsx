import React from 'react';
import type { ZanianTime } from './types';
import { yearDuration } from './App';

interface ClockProps {
    time: ZanianTime;
}

export const Clock: React.FC<ClockProps> = ({ time }) => {
    return (
        <div className="bg-black/50 rounded-lg p-6 border border-gray-800 text-center">
            <div className="text-gray-500 text-sm font-semibold tracking-widest uppercase">Current Date</div>
            <div className="text-3xl font-bold text-white mt-1">Day {time.day} / {yearDuration}</div>
            <div className="text-gray-400 mt-1">{time.phase}</div>
            
            <div className="border-t border-gray-700 my-4"></div>
            
            <div className="text-gray-500 text-sm font-semibold tracking-widest uppercase">Current Time</div>
            <div className="text-5xl font-mono font-bold text-white mt-1 tracking-wider">{time.time}</div>
            <div className="text-gray-600 text-sm tracking-widest">ZVT (Zan Variant Time)</div>
        </div>
    );
};