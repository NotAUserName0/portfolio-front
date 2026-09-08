import { Route, Routes } from 'react-router-dom'

import AdminRoutes from './ws/Admin/Admin.routing.tsx'
import Website from './ws/Website/Website.tsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Website />} />
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="*" element={<Website />} />
  </Routes>
);

export default AppRoutes;