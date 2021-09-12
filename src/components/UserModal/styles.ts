import styled from 'styled-components'

export const Container = styled.div`
   width: 500px;
   height: 500px;
   position: absolute;
   left: 50%;
   top: 50%; 
   margin-left: -250px;
   margin-top: -250px;
   background-color: #fff;

   div{
     display: flex;
     flex-direction: column;
     padding: 20px;
     img{
       width: 140px;
       border-radius: 50%;
       position: relative;
       bottom: 50;
       left: 50%;
       margin-left: -70px;
       margin-top: -50px;
     }

     h2, p {
      margin: 5px 0;
     }

     button{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;

      border: none;
      background-color: transparent;
      svg {
        margin-right: 10px;
       }
     }
   }
`