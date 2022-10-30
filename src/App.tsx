import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>hi</div>
    </QueryClientProvider>
  );
}

export default App;
