import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import Settings from 'assets/icons/settings.svg';
import { isEmptyObject } from 'helpers/objects';
import t from 'helpers/translate';
import { ModalContext } from 'hooks/context/modal';
import { PlayerContext } from 'hooks/context/player';

import SettingsModal from './modals/SettingsModal';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const Text = tw.p`
  font-bold text-black uppercase
`;

const PlayerInfos = tw.div`
  flex flex-row
`;

const Image = tw.img`
  ml-1 cursor-pointer
`;

const Header = (): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);
  const { openModal } = useContext(ModalContext);

  const showSettingsModal = (): void => openModal(<SettingsModal />);

  return (
    <Navigation>
      <Text>{t('header.project_name')}</Text>
      {!isEmptyObject(playerSession) && (
        <PlayerInfos>
          <Text>{playerSession.name}</Text>
          <Image alt="settings" src={Settings} onClick={showSettingsModal} />
        </PlayerInfos>
      )}
    </Navigation>
  );
};

export default Header;
