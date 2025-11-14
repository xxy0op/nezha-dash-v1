import React, { useState, useEffect } from 'react';
import { useThemeSettings } from '../hooks/useThemeSettings';

const SiteUptime: React.FC = () => {
  const { themeSettings, loading } = useThemeSettings();
  const [uptimeText, setUptimeText] = useState<string>('');

  useEffect(() => {
    const updateUptime = () => {
      if (!themeSettings?.site_created_date || !themeSettings.show_uptime) {
        setUptimeText('');
        return;
      }

      try {
        const createdDate = new Date(themeSettings.site_created_date);
        const now = new Date();

        if (isNaN(createdDate.getTime())) {
          setUptimeText('无效的创建时间');
          return;
        }

        if (createdDate > now) {
          setUptimeText('创建时间不能是未来时间');
          return;
        }

        const diffMs = now.getTime() - createdDate.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        // 计算准确的年月日时分
        const years = Math.floor(diffDays / 365);
        const remainingDaysAfterYears = diffDays % 365;
        const months = Math.floor(remainingDaysAfterYears / 30);
        const remainingDaysAfterMonths = remainingDaysAfterYears % 30;
        const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));

        const uptimeText = `🎉 已陪伴您 ${years}年${months}个月${remainingDaysAfterMonths}天 ${hours}小时${minutes}分钟`;
        setUptimeText(uptimeText);
      } catch (error) {
        setUptimeText('运行时间计算错误');
      }
    };

    updateUptime();
    const interval = setInterval(updateUptime, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, [themeSettings]);

  if (loading || !uptimeText) {
    return null;
  }

  return (
    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
      {uptimeText}
    </div>
  );
};

export default SiteUptime;