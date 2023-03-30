import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
    },
    left: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    center: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

const Column = ({ children, left, center, style, ...props }) => {
    const rowVariants = [
        styles.row,
        left && styles.left,
        center && styles.center,
        style,
    ];
    return (
        <View style={rowVariants} {...props}>
            {children}
        </View>
    );
};

export default Column;
