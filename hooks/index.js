import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';

export const useAuth = () => useContext(AuthContext);
export const useLinks = () => useContext(LinkContext);
