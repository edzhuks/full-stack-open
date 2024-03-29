import { Platform } from 'react-native';

const theme = {
    colors: {
        appBarBackground: '#24292e',
        inverseText: 'white',
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        background: '#e1e4e8',
        foreground: 'white',
        error: '#d73a4a',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        appBar: 16,
        heading: 18,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    paddings: {
        appBarTab: 16,
        cardContent: 16,
        cardContentCompact: 8,
    },
    cornerRadius: 4,
};

export default theme;
