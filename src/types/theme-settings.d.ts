export interface ThemeConfiguration {
  site_created_date?: string;
  show_uptime?: boolean;
}

export interface PublicApiResponse {
  success: boolean;
  data?: ThemeConfiguration;
}