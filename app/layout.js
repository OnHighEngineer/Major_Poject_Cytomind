import '../styles/globals.css';
import { AuthProvider } from '../src/context/AuthContext';

export const metadata = {
  title: 'Medical AI System',
  description: 'Bone Marrow Diagnostic Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
