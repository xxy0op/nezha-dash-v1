import { useState, useEffect } from 'react';

interface ThemeSettings {
  site_created_date?: string;
  show_uptime?: boolean;
}

interface PublicApiResponse {
  status: string;
  message: string;
  data: {
    theme_settings?: ThemeSettings | null;
    [key: string]: any;
  };
}

export const useThemeSettings = () => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/public');
        const data: PublicApiResponse = await response.json();

        if (data.status === 'success' && data.data?.theme_settings) {
          setThemeSettings(data.data.theme_settings);
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