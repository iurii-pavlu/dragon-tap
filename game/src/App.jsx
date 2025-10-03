import React, { useState, useEffect, useCallback } from 'react';
import { Users, Star, Home, Trophy, Gamepad2, ChevronLeft, Gift, Zap, Box } from 'lucide-react';

const translations = {
  en: {
    appName: "Dragon Tap", close: "Close", level: "LEVEL", getLucky: "GET LUCKY",
    inventory: "INVENTORY", friends: "Friends", tasks: "Tasks", tap: "Tap!",
    rating: "Rating", games: "Games", inviteFriends: "INVITE FRIENDS AND EARN COINS!",
    rewardForYou: "Reward for you and your friend", rewardForFriend: "Reward for friend with premium",
    bonusForLeveling: "BONUS FOR LEVELING UP", copyInvite: "COPY INVITE", invite: "INVITE",
    myFriends: "MY FRIENDS", ourTasks: "OUR TASKS", partners: "PARTNER'S",
    dailyTasks: "DAILY TASKS", dailyRewards: "Daily rewards", get: "GET",
    moreTasksComing: "MORE TASKS COMING SOON...", leaderboard: "LEADERBOARD",
    luckyWheel: "LUCKY WHEEL", headsOrTails: "HEADS OR TAILS", raffle: "RAFFLE",
    voucherHunter: "VOUCHER HUNTER", play: "PLAY", dailyReward: "DAILY REWARDS",
    day: "DAY", pickUp: "PICK UP", youGot: "YOU GOT:", commonLootbox: "COMMON LOOTBOX",
    rareLootbox: "RARE LOOTBOX", epicLootbox: "EPIC LOOTBOX", legendaryLootbox: "LEGENDARY LOOTBOX",
    buyFor: "BUY FOR", skip: "SKIP", next: "NEXT", welcomeTitle: "DRAGON TAP ADVENTURE!",
    welcomeDesc: "Time to awaken your dragon power! Tap to earn coins and become the ultimate dragon master.",
    lootboxTitle: "DRAGON LOOTBOX MADNESS!", lootboxDesc: "Time to level up your hustle!",
    startTapping: "START TAPPING", open: "OPEN"
  },
  vi: {
    appName: "Dragon Tap", close: "Đóng", level: "CẤP", getLucky: "THỬ VẬN MAY",
    inventory: "KHO ĐỒ", friends: "Bạn bè", tasks: "Nhiệm vụ", tap: "Chạm!",
    rating: "Xếp hạng", games: "Trò chơi", inviteFriends: "MỜI BẠN BÈ VÀ KIẾM XU!",
    rewardForYou: "Phần thưởng cho bạn", rewardForFriend: "Phần thưởng cho bạn bè premium",
    bonusForLeveling: "THƯỞNG THĂNG CẤP", copyInvite: "SAO CHÉP", invite: "MỜI",
    myFriends: "BẠN BÈ", ourTasks: "NHIỆM VỤ", partners: "ĐỐI TÁC",
    dailyTasks: "NHIỆM VỤ HÀNG NGÀY", dailyRewards: "Thưởng hàng ngày", get: "NHẬN",
    moreTasksComing: "NHIỆM VỤ MỚI SẮP RA...", leaderboard: "XẾP HẠNG",
    luckyWheel: "VÒNG QUAY", headsOrTails: "NGỬA SẤP", raffle: "XỔ SỐ",
    voucherHunter: "SĂN VOUCHER", play: "CHƠI", dailyReward: "THƯỞNG NGÀY",
    day: "NGÀY", pickUp: "NHẬN", youGot: "BẠN ĐƯỢC:", commonLootbox: "HỘP THƯỜNG",
    rareLootbox: "HỘP HIẾM", epicLootbox: "HỘP SỬ THI", legendaryLootbox: "HỘP HUYỀN THOẠI",
    buyFor: "MUA", skip: "BỎ QUA", next: "TIẾP", welcomeTitle: "RỒNG PHIÊU LƯU!",
    welcomeDesc: "Đánh thức sức mạnh rồng! Chạm kiếm xu và trở thành bậc thầy rồng.",
    lootboxTitle: "HỘP QUÀ RỒNG!", lootboxDesc: "Nâng cấp sức mạnh ngay!",
    startTapping: "BẮT ĐẦU", open: "MỞ"
  }
};

export default function DragonTapApp() {
  const [language, setLanguage] = useState('vi');
  const [activeTab, setActiveTab] = useState('tap');
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(500);
  const [maxEnergy] = useState(500);
  const [level, setLevel] = useState(1);
  const [tapPower] = useState(1);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showLootbox, setShowLootbox] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(1);
  const [lootboxReward, setLootboxReward] = useState(null);
  const [taps, setTaps] = useState([]);
  const [gems] = useState(1615);
  const t = translations[language];

  useEffect(() => {
    const saved = localStorage.getItem('dragonTapData');
    if (saved) {
      const data = JSON.parse(saved);
      setCoins(data.coins || 0);
      setEnergy(data.energy || 500);
      setLevel(data.level || 1);
      setDailyStreak(data.dailyStreak || 1);
      setShowOnboarding(!data.hasSeenOnboarding);
      if ((Date.now() - (data.lastLogin || Date.now())) / 3600000 >= 24) setShowDailyReward(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dragonTapData', JSON.stringify({
      coins, energy, level, dailyStreak, gems, lastLogin: Date.now(), hasSeenOnboarding: !showOnboarding
    }));
  }, [coins, energy, level, dailyStreak, gems, showOnboarding]);

  useEffect(() => {
    const interval = setInterval(() => setEnergy(p => Math.min(p + 1, maxEnergy)), 1000);
    return () => clearInterval(interval);
  }, [maxEnergy]);

  const handleTap = useCallback((e) => {
    if (energy >= 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const tapId = Date.now() + Math.random();
      setCoins(p => p + tapPower);
      setEnergy(p => Math.max(0, p - 1));
      setTaps(p => [...p, { id: tapId, x: e.clientX - rect.left, y: e.clientY - rect.top, value: tapPower }]);
      setTimeout(() => setTaps(p => p.filter(t => t.id !== tapId)), 1000);
    }
  }, [energy, tapPower]);

  const openLootbox = (type) => {
    const rewards = { common: {coins:1000,tickets:1}, rare: {coins:5000,tickets:2}, epic: {coins:20000,tickets:5}, legendary: {coins:100000,tickets:10} };
    setCoins(p => p + rewards[type].coins);
    setLootboxReward(rewards[type]);
    setTimeout(() => { setLootboxReward(null); setShowLootbox(false); }, 3000);
  };

  const claimDailyReward = () => {
    const rewards = [500,1000,2500,5000,15000,25000,100000,500000,1000000,5000000];
    setCoins(p => p + rewards[Math.min(dailyStreak-1, rewards.length-1)]);
    setDailyStreak(p => p + 1);
    setShowDailyReward(false);
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
        <div className="absolute top-4 right-4">
          <button onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')} className="px-4 py-2 bg-gray-800 rounded-lg text-sm">
            {language === 'en' ? 'VI' : 'EN'}
          </button>
        </div>
        {onboardingStep === 0 ? (
          <div className="text-center">
            <div className="text-8xl mb-8">🐉</div>
            <h1 className="text-4xl font-bold mb-4 text-yellow-500">{t.welcomeTitle}</h1>
            <p className="text-lg mb-12 text-gray-300 max-w-md">{t.welcomeDesc}</p>
            <button onClick={() => setOnboardingStep(1)} className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-xl font-bold">{t.next}</button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-8xl mb-8">📦</div>
            <h1 className="text-4xl font-bold mb-4 text-yellow-500">{t.lootboxTitle}</h1>
            <p className="text-lg mb-12 text-gray-300 max-w-md">{t.lootboxDesc}</p>
            <button onClick={() => setShowOnboarding(false)} className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-xl font-bold">{t.startTapping}</button>
            <button onClick={() => setShowOnboarding(false)} className="block mx-auto mt-4 text-gray-500">{t.skip}</button>
          </div>
        )}
      </div>
    );
  }

  if (showDailyReward) {
    const rewards = [{day:1,coins:500,tickets:2},{day:2,coins:1000,tickets:3},{day:3,coins:2500,tickets:3},{day:4,coins:5000,tickets:3},{day:5,coins:15000,tickets:3},{day:6,coins:25000,tickets:3},{day:7,coins:100000,tickets:3},{day:8,coins:500000,tickets:3},{day:9,coins:1000000,tickets:3}];
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <button onClick={() => setShowDailyReward(false)} className="mb-4"><ChevronLeft size={24}/></button>
        <h1 className="text-4xl font-bold text-center mb-8">{t.dailyReward}</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {rewards.map((r,i) => (
            <div key={i} className={`p-4 rounded-xl ${dailyStreak===r.day?'bg-gradient-to-br from-yellow-600 to-orange-700 border-4 border-yellow-400':'bg-gray-800'}`}>
              <div className="text-xs mb-2">{t.day} #{r.day}</div>
              <div className="font-bold">{r.coins>=1000?`${r.coins/1000}k`:r.coins}</div>
            </div>
          ))}
        </div>
        <button onClick={claimDailyReward} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-xl font-bold">{t.pickUp}</button>
      </div>
    );
  }

  if (showLootbox) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <button onClick={() => setShowLootbox(false)} className="mb-4"><ChevronLeft size={24}/></button>
        <h1 className="text-4xl font-bold text-center mb-8">{t.inventory}</h1>
        {lootboxReward ? (
          <div className="text-center"><h2 className="text-3xl font-bold mb-4 text-yellow-500">{t.youGot}</h2><div className="text-2xl">{lootboxReward.coins.toLocaleString()} + {lootboxReward.tickets}</div></div>
        ) : (
          <div className="space-y-6">
            {[{type:'common',name:t.commonLootbox,coins:1000,tickets:1,price:'9,000₫',bg:'bg-gray-800',btnColor:'bg-blue-600'},{type:'epic',name:t.epicLootbox,coins:20000,tickets:5,bg:'bg-gradient-to-br from-purple-900 to-pink-900',btnColor:'bg-purple-600'},{type:'legendary',name:t.legendaryLootbox,coins:100000,tickets:10,bg:'bg-gradient-to-br from-yellow-900 to-orange-900',btnColor:'bg-gradient-to-r from-yellow-600 to-orange-600'}].map(l => (
              <div key={l.type} className={`${l.bg} p-6 rounded-xl text-center`}>
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">{l.name}</h3>
                <p className="text-gray-400 mb-4">{l.coins.toLocaleString()} + {l.tickets}</p>
                <button onClick={() => openLootbox(l.type)} className={`w-full py-3 ${l.btnColor} rounded-lg font-bold`}>{l.price?`${t.buyFor} ${l.price}`:t.open}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white pb-20">
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm z-50 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">{t.appName}</div>
        <button onClick={() => setLanguage(language==='en'?'vi':'en')} className="px-3 py-1 bg-gray-800 rounded-lg text-sm">{language==='en'?'VI':'EN'}</button>
      </div>

      {activeTab==='friends' && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">{t.inviteFriends}</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-xl"><p className="text-sm mb-2">{t.rewardForYou}</p><div className="text-xl font-bold">+5,000</div></div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-xl"><p className="text-sm mb-2">{t.rewardForFriend}</p><div className="text-xl font-bold">+25,000</div></div>
          </div>
        </div>
      )}

      {activeTab==='tasks' && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">{t.dailyTasks}</h2>
          <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-between mb-6">
            <span className="font-bold">{t.dailyRewards}</span>
            <button onClick={() => setShowDailyReward(true)} className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg font-bold">{t.get}</button>
          </div>
          <p className="text-center text-xl font-bold text-gray-500">{t.moreTasksComing}</p>
        </div>
      )}

      {activeTab==='tap' && (
        <div className="relative">
          <div className="p-4 flex items-center justify-between">
            <div className="bg-gray-800/50 px-4 py-2 rounded-xl font-bold">{t.level} {level}</div>
            <div className="flex gap-2">
              <div className="bg-gray-800/50 px-4 py-2 rounded-xl font-bold">{coins.toLocaleString()}</div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-xl font-bold">{gems}</div>
            </div>
          </div>
          <div className="flex flex-col items-center px-6 py-8">
            <button onClick={() => setShowDailyReward(true)} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-bold mb-6 flex items-center gap-2"><Gift size={20}/>{t.getLucky}</button>
            <div onClick={handleTap} className="relative cursor-pointer mb-8" style={{width:'280px',height:'280px'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full flex items-center justify-center text-9xl">🐉</div>
              {taps.map(tap => <div key={tap.id} className="absolute text-2xl font-bold text-yellow-400 pointer-events-none animate-float-up" style={{left:tap.x,top:tap.y}}>+{tap.value}</div>)}
            </div>
            <div className="w-full max-w-md"><div className="bg-gray-800/50 rounded-2xl p-4"><div className="flex justify-between items-center mb-2"><div className="flex items-center gap-2"><Zap className="text-yellow-500" size={20}/><span className="font-bold">{energy}/{maxEnergy}</span></div><button onClick={() => setShowLootbox(true)}><Box size={24}/></button></div><div className="w-full bg-gray-700 rounded-full h-3"><div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full transition-all" style={{width:`${(energy/maxEnergy)*100}%`}}></div></div></div></div>
          </div>
        </div>
      )}

      {activeTab==='rating' && (
        <div className="p-6">
          <h1 className="text-4xl font-bold text-center mb-8">{t.leaderboard}</h1>
          {[{rank:1,name:'DragonMaster',score:978,highlight:true},{rank:2,name:'FireBreather',score:745},{rank:3,name:'ScaleWarrior',score:520}].map(p => (
            <div key={p.rank} className={`flex items-center justify-between p-4 rounded-xl mb-3 ${p.highlight?'bg-gradient-to-r from-yellow-600 to-orange-700':'bg-gray-800'}`}>
              <div className="flex items-center gap-4"><div className="text-2xl font-bold w-8">{p.rank}</div><span className="font-bold">{p.name}</span></div>
              <span className="text-2xl font-bold">{p.score}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab==='games' && (
        <div className="p-6">
          <h1 className="text-6xl font-bold text-center mb-8">{t.games}</h1>
          <div className="bg-gradient-to-br from-yellow-900 to-orange-900 p-6 rounded-2xl"><h2 className="text-3xl font-bold mb-4">{t.luckyWheel}</h2><div className="flex justify-between items-center"><div className="text-6xl">🎡</div><button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-bold text-xl">{t.play}</button></div></div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800"><div className="flex justify-around py-3">
        {[{id:'friends',Icon:Users,label:t.friends},{id:'tasks',Icon:Star,label:t.tasks},{id:'tap',Icon:Home,label:t.tap},{id:'rating',Icon:Trophy,label:t.rating},{id:'games',Icon:Gamepad2,label:t.games}].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab===tab.id?'text-yellow-500':'text-gray-500'}`}><tab.Icon size={24}/><span className="text-xs font-medium">{tab.label}</span></button>
        ))}
      </div></div>
      <style>{`@keyframes float-up{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-100px)}}.animate-float-up{animation:float-up 1s ease-out forwards}`}</style>
    </div>
  );
}
