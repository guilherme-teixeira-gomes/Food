import { AuthContext } from 'app/context/Auth/AuthContext';
import { RoutesPath } from 'app/routes/useRoutes';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function RedirectPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    navigate(
      user.type === 'ADMINISTRACAO'
        ? RoutesPath.TELA_INICIAL
        : user.type === 'CLIENTE'
          ? RoutesPath.TELA_INICIAL
          : RoutesPath.TELA_INICIAL
    )
  }, []);

  return (
    <div></div>
  )
}

export default RedirectPage