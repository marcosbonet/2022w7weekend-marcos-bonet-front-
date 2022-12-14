import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Robots = lazy(() => import('../../../../features/pages/pages'));
export function AppRoutes() {
    return (
        <Suspense>
            <Routes>
                <Route path="" element={<Robots></Robots>}></Route>
                <Route path="" element={<Robots></Robots>}></Route>
                <Route path="*" element={<Navigate replace to="" />}></Route>
            </Routes>
        </Suspense>
    );
}
