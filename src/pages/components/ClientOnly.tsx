import React, { PropsWithChildren, useEffect, useState } from "react";

const ClientOnly: React.FC<PropsWithChildren> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return children as React.ReactElement;
};

export default ClientOnly;
