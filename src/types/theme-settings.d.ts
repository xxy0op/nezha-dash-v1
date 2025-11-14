export interface ThemeSettings {
  site_created_date?: string;
  show_uptime?: boolean;
}

export interface PublicApiResponse {
  status: string;
  message: string;
  data: {
    theme_settings?: ThemeSettings | null;
    [key: string]: any;
  };
}