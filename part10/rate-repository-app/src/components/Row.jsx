import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    left: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    even: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

const Row = ({ children, left, even, style, ...props }) => {
    const rowVariants = [
        styles.row,
        left && styles.left,
        even && styles.even,
        style,
    ];
    return (
        <View style={rowVariants} {...props}>
            {children}
        </View>
    );
};

export default Row;
