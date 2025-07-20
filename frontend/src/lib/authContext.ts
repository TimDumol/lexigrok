import { createContext } from 'react';
import { AuthContextType } from './auth';

export const AuthContext = createContext<AuthContextType | null>(null);
