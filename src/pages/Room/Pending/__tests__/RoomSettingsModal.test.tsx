import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { adminSession, noRoomSession } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<RoomSettingsModal />', () => {
  it('should be able to delete the room as an admin', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByTitle('roomSettings'));

    await userEvent.type(
      screen.getByPlaceholderText('Confirm by typing the room code'),
      roomCode,
    );

    await userEvent.click(screen.getByText('Delete the room'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
