export interface AuthPanelProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: { name: string }) => void; // ✅ Add callback
}