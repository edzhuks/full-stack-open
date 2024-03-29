import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryPage from './RepositoryPage';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUp';
import ReviewList from './ReviewList';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/createReview" element={<ReviewForm />} exact />
                <Route
                    path="/repositories/:id"
                    element={<RepositoryPage />}
                    exact
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/reviews" element={<ReviewList />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
