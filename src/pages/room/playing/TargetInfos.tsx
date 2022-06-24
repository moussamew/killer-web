import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import Glasses from '@/assets/images/glasses.png';
import t from '@/helpers/translate';
import { TargetContext } from '@/hooks/context/target';

const Content = tw.section`
  flex flex-col items-center
  text-center
`;

const Image = tw.img`
  mb-2
`;

const Target = tw.div`
  flex flex-row items-center
`;

const Text = tw.p`
  font-medium
`;

const PlayerToKill = tw.span`
  shadow-xl border border-black
  p-0.5 my-1 rounded-lg bg-red-400
  max-w-fit	text-3xl relative
  text-white font-medium ml-1
`;

const Mission = tw(PlayerToKill)`
  bg-yellow-200 text-lightDark ml-0
`;

export const TargetInfos = (): JSX.Element => {
  const { targetInfos } = useContext(TargetContext);

  return (
    <Content>
      <Image alt="party" src={Glasses} />
      <h2>{t('playing_room.target_section_title')}</h2>
      <Target>
        <Text>{t('playing_room.target_to_kill')}</Text>
        <PlayerToKill>{targetInfos.target?.name}</PlayerToKill>
      </Target>
      <Text>{t('playing_room.mission_to_do')}</Text>
      <Mission>{targetInfos.mission?.content}</Mission>
    </Content>
  );
};
