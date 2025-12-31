import { useEffect, useState } from "react";
import * as Network from "expo-network";

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsOnline(state.isInternetReachable ?? false);
    };

    checkNetwork();

    const interval = setInterval(checkNetwork, 3000);
    return () => clearInterval(interval);
  }, []);

  return isOnline;
}
