import React from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles'

const Wrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 450px;
display: flex;
box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
`; 

const Left = styled.div`
width: 35%;
background: -moz-linear-gradient(90deg, rgba(0,128,128,1) 15%, rgba(103,179,179,1) 68%, rgba(255,255,255,1) 100%);
background: -webkit-linear-gradient(90deg, rgba(0,128,128,1) 15%, rgba(103,179,179,1) 68%, rgba(255,255,255,1) 100%);
background: linear-gradient(90deg, rgba(0,128,128,1) 15%, rgba(103,179,179,1) 68%, rgba(255,255,255,1) 100%);
padding: 30px 25px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
text-align: center;
color: #fff;
`

const Right = styled.div`
width: 65%;
  background: #fff;
  padding: 30px 25px;
  border-top-right-radius: 5px;
  border-bottom-right
`


function Profile() {
    return (
       <Wrapper>
            <Left>
                <img src="https://via.placeholder.com/250" alt="user" width="100"></img>
                <h4>User Name</h4>
                <h5>First and Last</h5>
            </Left>
            <div className="right">
                <div className="info">
                    <h3> Favorite Drinks</h3>
                    <div className="info-data"></div>
                    <div className='data'>
                    <img src="https://via.placeholder.com/250" alt='drink' width='70'></img>
                    </div>
                </div>
                <div className="meals">
                    <h3>Favorite meals</h3>
                    <div className="favMealsData">
                        <div className="data">
                        <img src="https://via.placeholder.com/250" alt='meal' width='70'></img> 
                        </div>
                    </div>
                </div>
            </div>
       </Wrapper>
    )
}

export default Profile;