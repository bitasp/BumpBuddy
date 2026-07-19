/**
 * BumpBuddy App — Root Router
 * "Help families care for Mom together, one tiny story at a time."
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash              from './screens/Splash';
import RoleSelection       from './screens/RoleSelection';
import MomHome             from './screens/MomHome';
import MomStoryCard        from './screens/MomStoryCard';
import MomRequestSent      from './screens/MomRequestSent';
import SupporterRequests   from './screens/SupporterRequests';
import SupporterDetails    from './screens/SupporterDetails';
import SupporterCompletion from './screens/SupporterCompletion';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Shared */}
          <Route path="/"     element={<Splash />} />
          <Route path="/role" element={<RoleSelection />} />

          {/* Mom Journey */}
          <Route path="/mom/home"                     element={<MomHome />} />
          <Route path="/mom/story/:storyId"           element={<MomStoryCard />} />
          <Route path="/mom/sent/:requestId/:storyId" element={<MomRequestSent />} />

          {/* Supporter Journey */}
          <Route path="/supporter/requests"                          element={<SupporterRequests />} />
          <Route path="/supporter/details/:requestId/:storyId"       element={<SupporterDetails />} />
          <Route path="/supporter/complete/:requestId/:storyId"      element={<SupporterCompletion />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
