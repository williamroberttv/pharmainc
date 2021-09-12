import {  useEffect, useState, ChangeEvent } from 'react'

import {TableRow, TableHead, Table, TableBody, 
  TableContainer, Paper} from '@material-ui/core';
import {Delete, AccountCircle, Search} from '@material-ui/icons'
import { AiOutlineReload } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import UserModal from '../../components/UserModal'
import Header from '../../components/Header'

import { useListUsersContext } from '../../context/listUsersContext'
import { UsersDataProps } from '../../services/types'
import api from '../../services/api'
import formatDate from '../../services/formatDate'

import { Container, ButtonContainer,
   InputSection, StyledHeadTableCell, StyledBodyTableCell } from './styles'


const Dashboard = () => {
  const { getUsersData, handleModal } = useListUsersContext()
  
  const [usersList, setUsersList] = useState<UsersDataProps[]>([])
  const [filteredList, setFilteredList] = useState<UsersDataProps[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const [usersPerPage, setUsersPerPage] = useState(10)

// get current posts and
    const indexOfLastUser = usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const paginateUsers = usersList.slice(indexOfFirstUser, indexOfLastUser)

  
  async function getData(){
    const {data} = await api.get("",{params:{ results: 50, seed: 'foobar'}})
    setUsersList(data.results)
    getUsersData(data.results)
  }
  
  function handleDelete(id: string){
    const newList = usersList.filter(item => item.login.username !== id)
    console.log(id)
    setUsersList(newList)
  }

  function handleFilteredUsers(event: ChangeEvent<HTMLInputElement>){
    const filter = event.currentTarget.value
    setInputValue(filter.toLowerCase())
    console.log(inputValue)
    setFilteredList(usersList.filter( list => list.name.first.toLowerCase().includes(inputValue)))
  }

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Container>
      <Header/>
      <InputSection>
        <input onChange={e => handleFilteredUsers(e)} type="text" placeholder="Procurar usuário"/>
        <Search/>
      </InputSection>
     <TableContainer component={Paper} style={{width:'60%', margin: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeadTableCell >
                <p>Nome</p>
              </StyledHeadTableCell>
              <StyledHeadTableCell>
                <p>Gênero</p>
                </StyledHeadTableCell>
              <StyledHeadTableCell>
                <p>Data de Nascimento</p>
              </StyledHeadTableCell>
              <StyledHeadTableCell>
                <p>Ações</p>
              </StyledHeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(inputValue.length <  2 ? paginateUsers : filteredList).map((user, index) => (
              <TableRow key={index}>
                <StyledBodyTableCell component="th" scope="row">
                  <p>{`${user.name.first} ${user.name.last}`}</p>
                </StyledBodyTableCell>
                <StyledBodyTableCell>
                  <p>
                  {user.gender === 'male' ? 'Masculino' : 'Feminino'}
                  </p>
                  </StyledBodyTableCell>
                <StyledBodyTableCell >
                  <p>{formatDate(user.dob.date)}</p>
                </StyledBodyTableCell>
                <StyledBodyTableCell>
                  <div>
                    <button onClick={() => handleDelete(user.login.username)}><Delete/></button>
                    <Link to={`/${user.login.username}`}>
                      <button onClick={() => handleModal(true)}>
                        <AccountCircle/>
                      </button>
                    </Link>
                  </div>
                </StyledBodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal />
      <ButtonContainer>
        <button onClick={() => setUsersPerPage(prevState => prevState + 10)}>
          <AiOutlineReload size={22}/>
          <span>Loading More</span>
        </button>
      </ButtonContainer>
    </Container>
  );
}

export default Dashboard;