import { useState, useEffect } from 'react';

interface ThemeConfiguration {
  site_created_date?: string;
  show_uptime?: boolean;
}

interface PublicApiResponse {
  success: boolean;
  data?: ThemeConfiguration;
}

export const useThemeSettings = () => {
  const [themeSettings, setThemeSettings] = useState<ThemeConfiguration | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/public');
        const data: PublicApiResponse = await response.json();

        if (data.success && data.data) {
          setThemeSettings(data.data);
        } else {
          setThemeSettings(null);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch theme settings');
        setThemeSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeSettings();
  }, []);

  return { themeSettings, loading, error };
};