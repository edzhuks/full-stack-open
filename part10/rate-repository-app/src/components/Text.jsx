import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
    heading: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.heading,
        color: theme.colors.textPrimary,
        paddingBottom: theme.paddings.cardContentCompact,
    },
    subheading: {
        fontWeight: theme.fontWeights.normal,
        fontSize: theme.fontSizes.subheading,
        color: theme.colors.textSecondary,
        paddingBottom: theme.paddings.cardContentCompact,
    },
});

const Text = ({
    color,
    fontSize,
    fontWeight,
    heading,
    subheading,
    style,
    ...props
}) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        heading && styles.heading,
        subheading && styles.subheading,
        style,
    ];

    return <NativeText style={textStyle} {...props} />;
};

export default Text;
