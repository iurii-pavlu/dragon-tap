// Telegram Mini App Integration
export const initTelegramWebApp = () => {
  if (typeof window === 'undefined') return null;
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#111827');
    tg.setBackgroundColor('#000000');
    tg.enableClosingConfirmation();
    console.log('✅ Telegram WebApp initialized');
    return tg;
  }
  console.warn('⚠️ Telegram WebApp not available');
  return null;
};

export const getTelegramUser = () => {
  const tg = window.Telegram?.WebApp;
  if (tg?.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      languageCode: user.language_code,
      isPremium: user.is_premium || false
    };
  }
  return null;
};

export const isTelegramEnvironment = () => {
  return window.Telegram?.WebApp !== undefined;
};

export const showNotification = (message) => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.showAlert(message);
  } else {
    alert(message);
  }
};

export const hapticFeedback = (type = 'light') => {
  const tg = window.Telegram?.WebApp;
  if (tg?.HapticFeedback) {
    switch (type) {
      case 'light':
      case 'medium':
      case 'heavy':
        tg.HapticFeedback.impactOccurred(type);
        break;
      case 'success':
      case 'warning':
      case 'error':
        tg.HapticFeedback.notificationOccurred(type);
        break;
      default:
        tg.HapticFeedback.impactOccurred('light');
    }
  }
};

export const shareApp = (referralCode) => {
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'YourBotUsername';
  const shareUrl = `https://t.me/${botUsername}?start=${referralCode}`;
  const shareText = `🐉 Join me in Dragon Tap! Tap to earn coins!\n\n${shareUrl}`;
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
  } else if (navigator.share) {
    navigator.share({ title: 'Dragon Tap', text: shareText, url: shareUrl });
  } else {
    navigator.clipboard.writeText(shareText);
    alert('Link copied!');
  }
};

export const getStartParameter = () => {
  const tg = window.Telegram?.WebApp;
  return tg?.initDataUnsafe?.start_param || null;
};

export default {
  initTelegramWebApp,
  getTelegramUser,
  isTelegramEnvironment,
  showNotification,
  hapticFeedback,
  shareApp,
  getStartParameter
};
