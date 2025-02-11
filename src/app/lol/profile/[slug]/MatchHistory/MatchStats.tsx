'use client';

import { useLanguage } from "@/context/LanguageContext";
import { MatchData } from '@/types/riot-api';

interface MatchStatsProps {
    match: MatchData;
    participantTeamId: number;
}

const MatchStats = ({ match, participantTeamId }: MatchStatsProps) => {
    const { t } = useLanguage();

    const allyTeam = match.info.participants.filter(p => p.teamId === participantTeamId);
    const enemyTeam = match.info.participants.filter(p => p.teamId !== participantTeamId);
    const allyGold = allyTeam.reduce((sum, p) => sum + p.goldEarned, 0);
    const enemyGold = enemyTeam.reduce((sum, p) => sum + p.goldEarned, 0);
    const goldDiff = allyGold - enemyGold;

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    return (
        <div className="bg-black/30 rounded-lg p-3 m-4">
            <div className="flex justify-between items-center text-sm">
                <div className="text-[#C89B3C]">
                    {Math.floor(match.info.gameDuration / 60)}:{String(match.info.gameDuration % 60).padStart(2, '0')}
                </div>
                <div className="flex items-center space-x-8">
                    <div className="text-center">
                        <div className="text-[#C89B3C]">
                            {allyTeam.reduce((sum, p) => sum + p.kills, 0)} - {enemyTeam.reduce((sum, p) => sum + p.kills, 0)}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.kills}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#C89B3C]">
                            {match.info.teams.find(t => t.teamId === participantTeamId)?.objectives.dragon.kills || 0} - {match.info.teams.find(t => t.teamId !== participantTeamId)?.objectives.dragon.kills || 0}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.dragons}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#C89B3C]">
                            {match.info.teams.find(t => t.teamId === participantTeamId)?.objectives.baron.kills || 0} - {match.info.teams.find(t => t.teamId !== participantTeamId)?.objectives.baron.kills || 0}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.barons}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#C89B3C]">
                            {match.info.teams.find(t => t.teamId === participantTeamId)?.objectives.riftHerald.kills || 0} - {match.info.teams.find(t => t.teamId !== participantTeamId)?.objectives.riftHerald.kills || 0}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.heralds}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#C89B3C]">
                            {match.info.teams.find(t => t.teamId === participantTeamId)?.objectives.tower.kills || 0} - {match.info.teams.find(t => t.teamId !== participantTeamId)?.objectives.tower.kills || 0}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.towers}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#C89B3C]">
                            {match.info.teams.find(t => t.teamId === participantTeamId)?.objectives.horde?.kills || 0} - {match.info.teams.find(t => t.teamId !== participantTeamId)?.objectives.horde?.kills || 0}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.grubs}</div>
                    </div>
                    <div className="text-center">
                        <div className={`${goldDiff > 0 ? 'text-[#00FF00]' : 'text-[#FF4655]'}`}>
                            {goldDiff > 0 ? '+' : ''}{formatNumber(goldDiff)}
                        </div>
                        <div className="text-xs text-gray-400">{t.lol.profile.stats.goldDiff}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchStats; 