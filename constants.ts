export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
  component: string;
}

export const APPS: AppInfo[] = [
  { id: 'calendar', name: 'Calendar', icon: 'Calendar', color: 'bg-white text-red-500', component: 'CalendarApp' },
  { id: 'weather', name: 'Weather', icon: 'CloudSun', color: 'bg-blue-400 text-white', component: 'WeatherApp' },
  { id: 'photos', name: 'Photos', icon: 'Image', color: 'bg-white text-blue-500', component: 'PhotosApp' },
  { id: 'appstore', name: 'App Store', icon: 'ShoppingBag', color: 'bg-blue-600 text-white', component: 'AppStoreApp' },
  { id: 'settings', name: 'Settings', icon: 'Settings', color: 'bg-gray-200 text-gray-700', component: 'SettingsApp' },
  { id: 'clock', name: 'Clock', icon: 'Clock', color: 'bg-black text-orange-500', component: 'ClockApp' },
  { id: 'calculator', name: 'Calculator', icon: 'Calculator', color: 'bg-orange-500 text-white', component: 'CalculatorApp' },
  { id: 'maps', name: 'Maps', icon: 'MapPin', color: 'bg-white text-green-500', component: 'MapsApp' },
  { id: 'notes', name: 'Notes', icon: 'FileText', color: 'bg-yellow-100 text-yellow-700', component: 'NotesApp' },
  { id: 'mail', name: 'Mail', icon: 'Mail', color: 'bg-blue-100 text-blue-600', component: 'MailApp' },
];

export const DOCK_APPS: AppInfo[] = [
  { id: 'phone', name: 'Phone', icon: 'Phone', color: 'bg-green-500 text-white', component: 'PhoneApp' },
  { id: 'safari', name: 'Safari', icon: 'Compass', color: 'bg-white text-blue-500', component: 'SafariApp' },
  { id: 'messages', name: 'Messages', icon: 'MessageCircle', color: 'bg-green-500 text-white', component: 'MessagesApp' },
  { id: 'music', name: 'Music', icon: 'Music', color: 'bg-pink-500 text-white', component: 'MusicApp' },
];
