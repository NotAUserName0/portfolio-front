import { Route, Routes } from 'react-router-dom'
import { adminGuard as AdminGuard, panelGuard as PanelGuard } from '../../helpers/guards/admin.guard.tsx'

import Login from './pages/Login/Login.tsx'
import Panel from './pages/Panel/Admin.tsx'

// Rutas hijas de /admin (el path base ya lo resuelve el <Route path="/admin/*"> del padre)
const AdminRoutes = () => (
  <Routes>
    // Routes accessible only if the user is not logged in (redirect to panel if logged in)
    <Route element={<PanelGuard />}>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
    </Route>
    // Routes accessible only if the user is logged in (redirect to login if not logged in)
    <Route element={<AdminGuard />}>
      <Route path="panel" element={<Panel />} />
    </Route>
    <Route path="*" element={<Login />} />
  </Routes>
);

export default AdminRoutes;
