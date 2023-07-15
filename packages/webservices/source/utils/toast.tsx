import { type BaseToastProps, ErrorToast } from 'react-native-toast-message';

export function CustomErrorToast(props: BaseToastProps): JSX.Element {
  return (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#F87171',
        height: 80,
        borderRadius: 10,
        width: '90%',
      }}
      text1Style={{ display: 'none' }}
      text2Style={{
        fontSize: 16,
        color: '#fff',
      }}
      text2NumberOfLines={3}
    />
  );
}
