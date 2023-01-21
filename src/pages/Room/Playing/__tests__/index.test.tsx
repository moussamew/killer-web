import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerStatus } from '@/services/player/constants';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { playerInPlayingRoom } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<PlayingRoomPage />', () => {
  it('should render playing room page with current target', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPlayingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('Try to kill your target and survive!');

    expect(
      screen.getByText(playerInPlayingRoom.assignedMission.content),
    ).toBeInTheDocument();
  });

  it.skip('should render playing room page with dead message if the player is dead', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ ...playerInPlayingRoom, status: PlayerStatus.KILLED }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText('Too bad! You are dead.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Dead men tell no tales.. You just have to wait for the end of the game.',
      ),
    ).toBeInTheDocument();
  });
});
