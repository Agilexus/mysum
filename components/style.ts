import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
    bigText: {
        fontFamily: 'SFProRounded-Bold',
        fontSize: 32,
    },
    midlText: {
        fontFamily: 'SFProRounded-Medium',
        fontSize: 24,
    },
    regular: {
        fontFamily: 'SFProRounded-Regular',
        fontSize: 17,
    },
    mainNumb: {
        fontFamily: 'SFProRounded-Bold',
        fontSize: 48,
    },
    midlNumb: {
        fontFamily: 'SFProRounded-Bold',
        fontSize: 24,
    },
    smallNumb: {
        fontFamily: 'SFProRounded-Regular',
        fontSize: 24,
    }
  });

  export const mainStyles = StyleSheet.create({
    body: {
        flex: 1, 
        width: "100%",
        backgroundColor: '#F4FFFB',
        justifyContent: 'flex-start', 
        alignItems: 'center',
    }
  });