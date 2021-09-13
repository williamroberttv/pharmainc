import { useEffect } from 'react';
import { useListUsersContext } from '../../context/listUsersContext'
import { useParams } from 'react-router-dom'
import { Modal } from '@material-ui/core'
import { AiOutlineLink } from 'react-icons/ai'

import { Container } from './styles';
import formatDate from '../../services/formatDate'


interface UseParamsProps {
  id: string;
}

const UserModal = () => {

  const{ openModal, handleModal, usersData } = useListUsersContext()
  let params = useParams<UseParamsProps>()

  const user = usersData.filter( item => item.login.username === params.id)

  function copyLink(link: string) {
    navigator.clipboard.writeText(`http://localhost:3000/${link}`)
    alert('Copiado com sucesso!')
  }

  useEffect(() =>{
    params.id && handleModal(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <Modal open={openModal} onClose={() => handleModal(false)}>
      <Container>
        
          {user.map( (item, index) => 
          <div key={index}>
            <img src={item.picture.large} alt="imagem de " />
            <div>
              <h2>{`${item.name.first} ${item.name.last}`}</h2>
              <p>Idade: {item.dob.age}</p>
              <p>Data de nascimento: {formatDate(item.dob.date)}</p>
              <p>Gênero: {item.gender === 'male' ? 'Masculino' : 'Feminino'}</p>
              <p>Nacionalidade: {item.nat}</p>
              <p>Email: {item.email}</p>
              <p>Telefone: {item.phone}</p>
              <p>Local: {`${item.location.city}, ${item.location.country}.`}</p>
              <button 
              onClick={() => copyLink(item.login.username)}>
                <AiOutlineLink size={18}/> 
                Compartilhar
              </button>
            </div>
          </div>
          )}

      </Container>
    </Modal>
   
  );
}

export default UserModal;