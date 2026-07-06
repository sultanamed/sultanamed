import { createHashRouter } from 'react-router-dom';
import { MapScreen } from './screens/MapScreen';
import { IslandScreen } from './screens/IslandScreen';
import { UnitPlayer } from './screens/UnitPlayer';
import { ParentCorner } from './screens/ParentCorner';
import { WorksheetIndex } from './worksheets/WorksheetIndex';
import { WorksheetPrintView } from './worksheets/WorksheetPrintView';

export const router = createHashRouter([
  { path: '/', element: <MapScreen /> },
  { path: '/ada/:islandId', element: <IslandScreen /> },
  { path: '/ada/:islandId/unite/:unitId', element: <UnitPlayer /> },
  { path: '/calisma/:unitId', element: <WorksheetIndex /> },
  { path: '/calisma/:unitId/:sheetIndex', element: <WorksheetPrintView /> },
  { path: '/ebeveyn', element: <ParentCorner /> },
  { path: '*', element: <MapScreen /> },
]);
