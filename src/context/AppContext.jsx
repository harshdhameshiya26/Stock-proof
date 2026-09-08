import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { createApiClient } from '../services/apiClient';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const appBridge = useAppBridge();
  
  const [shopDomain, setShopDomain] = useState(null);
  const [user, setUser] = useState(null);
  
  // Extract shop domain from URL parameters (usually available in Shopify app context)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get('shop');
    if (shop) setShopDomain(shop);
  }, []);

  const api = useMemo(() => createApiClient(appBridge, shopDomain), [appBridge, shopDomain]);

  const value = {
    appBridge,
    api,
    shopDomain,
    user,
    setUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};