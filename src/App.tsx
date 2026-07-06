import { RouterProvider } from 'react-router-dom';
import { ProgressProvider } from './state/ProgressProvider';
import { router } from './router';

export function App() {
  return (
    <ProgressProvider>
      <RouterProvider router={router} />
    </ProgressProvider>
  );
}
