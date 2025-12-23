export interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userEmail: string;
  bookingsCount: number;
}
