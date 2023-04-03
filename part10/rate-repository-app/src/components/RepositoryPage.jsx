import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';

const RepositoryPage = () => {
    const { id } = useParams();
    const { repository } = useRepository(id);
    if (!repository) {
        return <Text>loading</Text>;
    }
    return <RepositoryItem repository={repository} expanded />;
};

export default RepositoryPage;
