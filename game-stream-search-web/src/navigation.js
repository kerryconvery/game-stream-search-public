import { useNavigate } from '@reach/router';

export const routes ={
  clientManagement: '/',
  clientRegistration: '/registration',
}

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    toClientManagement: () => navigate(routes.clientManagement),
    toClientRegistration: () => navigate(routes.clientRegistration),
  }
}