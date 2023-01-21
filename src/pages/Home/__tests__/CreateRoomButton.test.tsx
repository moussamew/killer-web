import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { playerInPendingRoom, playerWithoutRoom } from '@/tests/mocks/players';
import { pendingRoom } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderApplication } from '@/tests/utils';

describe('<CreateRoomButton />', () => {
  it('should open a room creation modal if the user does not have a session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderApplication();

    await screen.findByText('The right way to kill your friends..');

    await userEvent.click(screen.getByText('Create new room'));

    expect(
      screen.getByText('Before starting, create your pseudo'),
    ).toBeInTheDocument();
    expect(screen.getByText('Create my room')).toBeInTheDocument();
  });

  it('should create a new room and redirect to it for a player with session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
      rest.post(ROOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication();

    await screen.findByText(playerWithoutRoom.name);

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${pendingRoom.code}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await userEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        `The code to join this room is ${pendingRoom.code}.`,
      ),
    ).toBeInTheDocument();
  });

  it.skip('should show error message when there is an error while creating a new room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: null })),
      ),
      rest.post(ROOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(400), ctx.json({ errorCode: 'ROOM.ERROR' })),
      ),
    );

    renderApplication();

    await screen.findByText('Trinity');

    await userEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).toBeInTheDocument();
  });
});
