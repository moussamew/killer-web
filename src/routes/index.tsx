import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { WebViewDetector } from '@/layout/WebViewDetector';
import { HomePage } from '@/pages/home';
import { JoinRoomPage } from '@/pages/joinRoom';
import { NotFoundPage } from '@/pages/notFound';
import { RoomPage } from '@/pages/room';
import { EndedRoomPage } from '@/pages/room/ended';
import { PendingRoomPage } from '@/pages/room/pending';
import { PlayingRoomPage } from '@/pages/room/playing';

export function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <WebViewDetector>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join">
            <Route path=":roomCode" element={<JoinRoomPage />} />
          </Route>
          <Route path="/room">
            <Route
              path=":roomCode/pending"
              element={<RoomPage page={<PendingRoomPage />} />}
            />
            <Route
              path=":roomCode/playing"
              element={<RoomPage page={<PlayingRoomPage />} />}
            />
            <Route
              path=":roomCode/ended"
              element={<RoomPage page={<EndedRoomPage />} />}
            />
            <Route path=":roomCode" element={<RoomPage page={<Loader />} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </WebViewDetector>
    </BrowserRouter>
  );
}
