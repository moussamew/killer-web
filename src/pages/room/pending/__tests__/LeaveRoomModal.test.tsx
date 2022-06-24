import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { PlayerRole } from '@/constants/enums';
import { RoomProvider } from '@/hooks/context/room';
import { RoomPage } from '@/pages/room';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PendingRoomPage } from '..';
import { LeaveRoomModal } from '../LeaveRoomModal';

describe('<LeaveRoomModal />', () => {
  it('should be able to leave the room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7VBD/players`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([{ id: 0, name: 'Neo' }])),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={
              <RoomProvider>
                <RoomPage page={<PendingRoomPage />} />
              </RoomProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByAltText('leaveRoom'));

    fireEvent.click(screen.getByText('Leave this room'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Leave this room'),
    );

    expect(
      screen.queryByText(' Leave the current room'),
    ).not.toBeInTheDocument();
  });

  it('should let the user close error message if showed', async () => {
    server.use(
      rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'ROOM.CANNOT_LEAVE',
            message: 'Cannot leave this room',
          }),
        ),
      ),
    );

    renderWithProviders(<LeaveRoomModal />);

    fireEvent.click(await screen.findByText('Leave this room'));

    await screen.findByText('Cannot leave this room');

    fireEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(
      screen.queryByAltText('Cannot leave this room'),
    ).not.toBeInTheDocument();
  });
});
