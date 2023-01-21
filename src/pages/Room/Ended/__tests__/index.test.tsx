import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { endedRoom, roomCode } from '@/tests/mocks/rooms';
import { playerInEndedRoom, playerWithoutRoom } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<EndedRoomPage />', () => {
  it('should leave the ended room page to start a new game', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInEndedRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(endedRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByText('Play another party!'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
