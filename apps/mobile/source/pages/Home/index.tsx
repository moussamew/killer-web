import { useTranslation } from '@killerparty/intl';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable } from 'react-native';

import KillerParty from '../../assets/images/killerparty.svg';
import { Button } from '../../components/Button';
import { FadeInView } from '../../components/FadeInView';
import { type StackNavigation } from '../../types/navigation';

import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const { navigate } = useNavigation<StackNavigation>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FadeInView style={styles.fadeInView}>
        <View style={styles.howToPlayView}>
          <Pressable
            style={({ pressed }) => [
              styles.howToPlay,
              pressed && styles.howToPlayPressed,
            ]}
            onPress={() => navigate('CreateRoom')}
          >
            <Text style={styles.howToPlayText}>Règles du jeu</Text>
          </Pressable>
        </View>
        <View style={styles.header}>
          <View style={styles.image}>
            <KillerParty height={200} width={200} />
          </View>
          <View style={styles.banner}>
            <Text style={styles.title}>KILLER PARTY</Text>
          </View>
          <Text style={styles.headline}>
            Ça vous tente un petit meurtre.. entre amis ?
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            color="primary"
            onPress={() => navigate('CreateRoom')}
            text={t('home.create.room.button')}
          />
          <Button
            color="secondary"
            onPress={() => navigate('JoinRoom')}
            text={t('home.join.room')}
          />
        </View>
      </FadeInView>
    </View>
  );
}
